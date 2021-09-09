import { Client } from '@elastic/elasticsearch';
import { merge } from 'lodash';
import { Doc, Job } from './Job';
import { getCommonFields } from './common_fields';
import { EnvConfig } from './get_env';
import { logger } from './logging';

export function getEsClient(envConfig: EnvConfig) {
  return new Client({
    cloud: { id: envConfig.elastic.cloudId },
    auth: {
      username: envConfig.elastic.username,
      password: envConfig.elastic.password,
    },
  });
}

export async function bulkIngest(esClient: Client, docs: Doc[], job: Job) {
  const bulkBody = docs
    .map((doc) => merge(doc, getCommonFields(job)))
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
