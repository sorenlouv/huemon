import { Client } from '@elastic/elasticsearch';
import { ResponseError } from '@elastic/elasticsearch/lib/errors';
import got from 'got';
import { merge } from 'lodash';
import { getCommonFieldMappings } from './common_fields';
import { bulkIngest, getEsClient, rollover } from './elasticsearch';
import { EnvConfig, getEnvConfig } from './get_env';
import { createIndexPattern } from './kibana';
import { logger } from './logging';
import { Doc, Job } from './types';

export async function init(
  jobs: Job[],
  {
    onlyDisplay,
    onlyIngest,
    onlySetup,
  }: { onlyDisplay: boolean; onlyIngest: boolean; onlySetup: boolean }
) {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  const promises = jobs.map(async (job) => {
    if (onlyDisplay) {
      try {
        const docs = await job.getDocs(envConfig);
        console.log(JSON.stringify(docs, null, 2));
      } catch (e) {
        logger.error(
          //@ts-expect-error
          `An error occurred while getting docs for job "${job.name}": ${e.message}`
        );
        throw e;
      }
      return;
    }

    if (!onlyIngest) {
      try {
        await setupStep(envConfig, esClient, job);
      } catch (e) {
        logger.error(
          //@ts-expect-error
          `An error occurred while setting up job "${job.name}": ${e.message}`
        );
        throw e;
      }
    }

    if (!onlySetup) {
      logger.info(
        `Job "${job.indexTemplateName}": Starting interval at ${
          job.interval / 1000
        }s`
      );

      try {
        await runIngest(envConfig, esClient, job);
      } catch (e) {
        logger.error(
          //@ts-expect-error
          `An error occurred while ingesting for job "${job.name}": ${e.message}`
        );
        throw e;
      }
      setInterval(() => runIngest(envConfig, esClient, job), job.interval);
    }
  });

  return Promise.all(promises);
}

async function runIngest(envConfig: EnvConfig, esClient: Client, job: Job) {
  logger.info(`Job "${job.indexTemplateName}": Running ingest`);
  let docs: Doc[];

  try {
    docs = await job.getDocs(envConfig);
  } catch (e) {
    if (e instanceof got.RequestError) {
      if (e.code === 'ETIMEDOUT') {
        logger.warn(
          `Job "${job.indexTemplateName}": Timed out after ${Math.round(
            (e.timings?.phases.total ?? 0) / 1000
          )}s`
        );
        logger.debug(e);
        return;
      }
    }

    logger.error(`Job "${job.indexTemplateName}": Error getting documents`, e);
    return;
  }

  try {
    await bulkIngest(esClient, docs, job);
  } catch (e) {
    logger.error(`Job "${job.indexTemplateName}": An error occurred:`);
    logger.error(e);
  }
}

async function setupStep(envConfig: EnvConfig, esClient: Client, job: Job) {
  try {
    await esClient.indices.putIndexTemplate({
      name: job.indexTemplateName,
      create: false, // allow updating existing template
      body: {
        index_patterns: [job.indexPattern.title],
        data_stream: {},
        template: {
          settings: { number_of_shards: 1 },
          mappings: merge(job.indexTemplateMappings, getCommonFieldMappings()),
        },
      },
    });

    // setup ES (index templates, data streams etc)
    logger.info(`Created index template "${job.indexTemplateName}"`);

    await rollover(esClient, job);

    await createIndexPattern(envConfig, job);
  } catch (e) {
    if (e instanceof ResponseError) {
      if (e.statusCode === 409) {
        logger.info(
          `Job "${job.indexTemplateName}": Index template already exists`
        );
      } else {
        logger.error(
          `Job "${job.indexTemplateName}": Error creating index template: ${e.body.error?.reason}`
        );
      }
    }
    throw e;
  }
}
