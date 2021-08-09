import { Client } from '@elastic/elasticsearch';
import { EnvConfig } from './get_env';

export function getEsClient(envConfig: EnvConfig) {
  return new Client({
    cloud: { id: envConfig.elastic.cloudId },
    auth: {
      username: envConfig.elastic.username,
      password: envConfig.elastic.password,
    },
  });
}

export async function bulkIngest(
  esClient: Client,
  docs: any[],
  indexTemplateName: string
) {
  const bulkBody = docs.flatMap((doc) => [
    { index: { _index: indexTemplateName, op_type: 'create' } },
    doc,
  ]);

  const res = await esClient.bulk({ body: bulkBody });

  if (res.body.errors) {
    console.log(`Job "${indexTemplateName}": Bulk ingestion failed`);
    console.log(JSON.stringify(res.body.errors, null, 2));
  }

  console.log(
    `Job "${indexTemplateName}": Successfully ingested ${docs.length} docs`
  );

  return res;
}
