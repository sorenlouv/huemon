import got from 'got';
import { EnvConfig } from './get_env';

export function parseCloudId(cloudId: string) {
  const [instanceAlias, encodedString] = cloudId.split(':');
  const decodedString = Buffer.from(encodedString, 'base64').toString('utf8');
  const [hostname, esId, kbId] = decodedString.split('$');

  return {
    kibanaHost: `https://${kbId}.${hostname}`,
    esHost: `https://${esId}.${hostname}`,
    instanceAlias,
  };
}

interface IndexPattern {
  override?: boolean;
  refresh_fields?: boolean;
  index_pattern: {
    id: string;
    title: string;
    timeFieldName: string;
  };
}

export async function createIndexPattern(
  envConfig: EnvConfig,
  indexPattern: IndexPattern
) {
  const { username, password, cloudId } = envConfig.elastic;
  const { kibanaHost } = parseCloudId(cloudId);

  const res = await got
    .post(`${kibanaHost}/api/index_patterns/index_pattern`, {
      json: indexPattern,
      timeout: { request: 5000 },
      username,
      password,
      headers: {
        'kbn-xsrf': 'true',
      },
    })
    .json();

  console.log(
    `Created Kibana index pattern: "${indexPattern.index_pattern.title}"`
  );

  return res;
}

export function getIndexPatternId(indexTemplateName: string) {
  return `${indexTemplateName}_index_pattern_id`;
}

export async function deleteIndexPattern(
  envConfig: EnvConfig,
  indexPatternId: string
) {
  const { username, password, cloudId } = envConfig.elastic;
  const { kibanaHost } = parseCloudId(cloudId);

  try {
    await got.delete(
      `${kibanaHost}/api/index_patterns/index_pattern/${indexPatternId}`,
      {
        json: {},
        timeout: { request: 5000 },
        username,
        password,
        headers: {
          'kbn-xsrf': 'true',
        },
      }
    );

    console.log(`Deleted Kibana index pattern: "${indexPatternId}"`);
  } catch (e) {
    const alreadyDeleted = e.response.statusCode === 404;
    if (alreadyDeleted) {
      console.log(`Index pattern "${indexPatternId}" does not exist`);
      return;
    }

    throw e;
  }
}
