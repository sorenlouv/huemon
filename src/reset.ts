import { Client } from '@elastic/elasticsearch';
import { getEsClient } from './lib/elasticsearch';
import { getEnvConfig } from './lib/get_env';
import { deleteIndexPattern } from './lib/kibana';
import { logger } from './lib/logging';
import { Job } from './lib/types';

export async function reset(jobs: Job[]) {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  await Promise.all(
    jobs.flatMap((job) => {
      logger.info(`Job: "${job.indexTemplateName}": Resetting`);

      return [
        deleteIndexPattern(envConfig, job),
        deleteDataStreamAndIndexTemplate(esClient, job),
      ];
    })
  );
}

async function deleteDataStreamAndIndexTemplate(esClient: Client, job: Job) {
  // delete datasteam if exists
  try {
    await esClient.indices.getDataStream({ name: job.indexTemplateName });
    await esClient.indices.deleteDataStream({ name: job.indexTemplateName });
    logger.info(`Job "${job.indexTemplateName}": Deleted datastream`);
  } catch (e) {
    //@ts-expect-error
    if (e.meta.statusCode !== 404) {
      logger.info(
        `Job "${job.indexTemplateName}": Datastream could not be deleted`
      );
      throw e;
    }
  }

  // delete indices
  await esClient.indices.delete({ index: job.indexPattern.title });

  // delete template index if exists
  const res = await esClient.indices.existsIndexTemplate({
    name: job.indexTemplateName,
  });

  if (res.body) {
    await esClient.indices.deleteIndexTemplate({ name: job.indexTemplateName });
    logger.info(`Job "${job.indexTemplateName}": Index template deleted`);
  }
}
