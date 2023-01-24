import { Client } from '@elastic/elasticsearch';
import { merge } from 'lodash';
import { getCommonFields } from './common_fields';
import { EnvConfig } from './get_env';
import { logger } from './logging';
import { Doc, Job } from './types';

export function getEsClient(envConfig: EnvConfig) {
  if (
    !envConfig.elastic.cloudId ||
    !envConfig.elastic.username ||
    !envConfig.elastic.password
  ) {
    throw new Error('Elasticsearch configuration is missing in .env');
  }

  try {
    return new Client({
      cloud: { id: envConfig.elastic.cloudId },
      auth: {
        username: envConfig.elastic.username,
        password: envConfig.elastic.password,
      },
    });
  } catch (e) {
    logger.error('Error creating Elasticsearch client');
    throw e;
  }
}

export async function rollover(esClient: Client, job: Job) {
  return esClient.indices.rollover({ alias: job.indexTemplateName });
}

export async function bulkIngest(esClient: Client, docs: Doc[], job: Job) {
  const bulkBody = docs
    .map((doc) => merge(doc, getCommonFields(job, doc)))
    .flatMap((doc) => [
      { index: { _index: job.indexTemplateName, op_type: 'create' } },
      doc,
    ]);

  const res = await esClient.bulk({ body: bulkBody });

  if (res.body.errors) {
    logger.info(`Job "${job.indexTemplateName}": Bulk ingestion failed`);
    logger.info(JSON.stringify(res.body.errors, null, 2));
  }

  logger.info(
    `Job "${job.indexTemplateName}": Successfully ingested ${docs.length} docs`
  );

  return res;
}
