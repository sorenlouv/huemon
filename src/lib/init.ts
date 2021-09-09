import { merge } from 'lodash';
import { Job } from './Job';
import { getCommonFieldMappings } from './common_fields';
import { bulkIngest, getEsClient } from './elasticsearch';
import { getEnvConfig } from './get_env';
import { createIndexPattern, getIndexPatternId } from './kibana';
import { logger } from './logging';

export async function init(jobs: Job[]) {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  const promises = jobs.map(async (job) => {
    // setup ES (index templates, data streams etc)
    logger.info(`Job: "${job.indexTemplateName}": Creating index template`);

    await esClient.indices.putIndexTemplate({
      name: job.indexTemplateName,
      create: false, // allow updating existing template
      body: {
        index_patterns: [`${job.indexTemplateName}*`],
        data_stream: {},
        template: {
          settings: { number_of_shards: 1 },
          mappings: merge(job.indexTemplateMappings, getCommonFieldMappings()),
        },
      },
    });

    // ingest data
    const runIngest = async () => {
      try {
        const docs = await job.getDocs(envConfig);
        await bulkIngest(esClient, docs, job);
      } catch (e) {
        logger.error(`Job "${job.indexTemplateName}": An error occurred`, e);
      }
    };

    logger.info(
      `Job "${job.indexTemplateName}": Starting interval at ${
        job.interval / 1000
      }s`
    );
    await runIngest();

    // create Kibana index pattern
    if (job.indexPattern) {
      await createIndexPattern(envConfig, {
        override: true,
        refresh_fields: true,
        index_pattern: {
          id: getIndexPatternId(job.indexTemplateName),
          title: job.indexPattern.title,
          timeFieldName: job.indexPattern.timeFieldName,
        },
      });
    }

    setInterval(runIngest, job.interval);
  });

  return Promise.all(promises);
}
