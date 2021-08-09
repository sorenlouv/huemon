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

export async function deleteDataStreamAndIndexTemplate(
  esClient: Client,
  indexTemplateName: string
) {
  // delete datasteam if exists
  try {
    await esClient.indices.getDataStream({ name: indexTemplateName });
    await esClient.indices.deleteDataStream({ name: indexTemplateName });
    console.log(`Job "${indexTemplateName}": Deleted datastream`);
  } catch (e) {
    if (e.meta.statusCode !== 404) {
      console.log(
        `Job "${indexTemplateName}": Datastream could not be deleted`
      );
      throw e;
    }
  }

  // delete indices
  await esClient.indices.delete({ index: `${indexTemplateName}*` });

  // delete template index if exists
  const res = await esClient.indices.existsIndexTemplate({
    name: indexTemplateName,
  });

  if (res.body) {
    await esClient.indices.deleteIndexTemplate({ name: indexTemplateName });
    console.log(`Job "${indexTemplateName}": Index template deleted`);
  }
}
