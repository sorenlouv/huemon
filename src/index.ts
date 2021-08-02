import { Client } from '@elastic/elasticsearch';
import got from 'got';
import { getEnvConfig } from './get_env';
const envConfig = getEnvConfig();

type Light = {
  name: string;
  '@timestamp': string;
  state: {
    on: boolean;
    color_temperature: number;
    reachable: boolean;
    brightness: number;
  };
};

async function fetchLights(): Promise<Light[]> {
  type HueApiLights = Record<
    string,
    {
      name: string;
      state: { on: boolean; reachable: boolean; ct: number; bri: number };
    }
  >;

  const res = (await got
    .get(`${envConfig.hue.api.host}/api/${envConfig.hue.api.key}/lights`)
    .json()) as HueApiLights;

  const lights = Object.values(res).map((light) => {
    return {
      name: light.name,
      '@timestamp': new Date().toISOString(),
      state: {
        reachable: light.state.reachable,
        on: light.state.on,
        color_temperature: light.state.ct,
        brightness: light.state.bri,
      },
    };
  });

  return lights;
}

function getEsClient() {
  return new Client({
    cloud: { id: envConfig.elastic.cloudId },
    auth: {
      username: envConfig.elastic.username,
      password: envConfig.elastic.password,
    },
  });
}

async function ingestToES(esClient: Client, lights: Light[]) {
  const bulkBody = lights.flatMap((doc) => [
    { index: { _index: envConfig.elastic.dataStreamName, op_type: 'create' } },
    doc,
  ]);

  const res = await esClient.bulk({ body: bulkBody });

  if (res.body.errors) {
    const e = new Error('Bulk ingestion failed');
    //@ts-expect-error
    e.res = res;
    throw e;
  }

  return res;
}

async function createIndexTemplate(esClient: Client) {
  const { indexTemplateName, dataStreamName } = envConfig.elastic;

  await esClient.indices.putIndexTemplate({
    name: indexTemplateName,
    create: false, // allow updating existing template
    body: {
      index_patterns: [`${dataStreamName}*`],
      data_stream: {},
      priority: 500,
      template: {
        settings: {
          number_of_shards: 1,
        },
        mappings: {
          dynamic: false,
          properties: {
            name: { type: 'keyword' },
            '@timestamp': { type: 'date' },
            state: {
              dynamic: false,
              properties: {
                on: { type: 'boolean' },
                color_temperature: { type: 'short' },
                reachable: { type: 'boolean' },
                brightness: { type: 'short' },
              },
            },
          },
        },
      },
    },
  });
  console.log(`Index template "${indexTemplateName}" created`);
}

async function deleteDataStreamAndIndexTemplate(esClient: Client) {
  const { dataStreamName, indexTemplateName } = envConfig.elastic;

  // delete datasteam if exists
  try {
    await esClient.indices.getDataStream({ name: dataStreamName });
    await esClient.indices.deleteDataStream({ name: dataStreamName });
    console.log(`Data stream "${dataStreamName}" deleted`);
  } catch (e) {
    if (e.meta.statusCode !== 404) {
      console.log(`Data stream "${dataStreamName}" could not be deleted`);
      throw e;
    }
  }

  // delete if exists
  const res = await esClient.indices.existsIndexTemplate({
    name: indexTemplateName,
  });
  if (res.body) {
    await esClient.indices.deleteIndexTemplate({ name: indexTemplateName });
    console.log(`Index template "${indexTemplateName}" deleted`);
  }
}

async function init() {
  const esClient = getEsClient();
  await deleteDataStreamAndIndexTemplate(esClient);
  await createIndexTemplate(esClient);

  setInterval(async () => {
    console.log('Persist light state');
    const lights = await fetchLights();
    await ingestToES(esClient, lights);
  }, 1000 * 60);
}

init()
  .then(() => {
    console.log('Booted successfully');
  })
  .catch((e) => {
    console.error('Boot failed', e);
  });
