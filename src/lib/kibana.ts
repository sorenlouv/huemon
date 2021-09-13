import got from 'got';
import { getCommonIndexPatternFormatters } from './common_fields';
import { EnvConfig } from './get_env';
import { logger } from './logging';
import { IndexPattern, Job } from './types';

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

export async function createIndexPattern(envConfig: EnvConfig, job: Job) {
  const { username, password, cloudId } = envConfig.elastic;
  const { kibanaHost } = parseCloudId(cloudId);

  const indexPattern: IndexPattern = {
    override: true,
    refresh_fields: true,
    index_pattern: {
      id: getIndexPatternId(job.indexTemplateName),
      fieldFormats: getCommonIndexPatternFormatters(),
      ...job.indexPattern,
    },
  };

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

  logger.info(
    `Created Kibana index pattern: "${indexPattern.index_pattern.title}"`
  );

  return res;
}

export function getIndexPatternId(indexTemplateName: string) {
  return `${indexTemplateName}_index_pattern_id`;
}

export async function deleteIndexPattern(envConfig: EnvConfig, job: Job) {
  const { username, password, cloudId } = envConfig.elastic;
  const { kibanaHost } = parseCloudId(cloudId);
  const indexPatternId = getIndexPatternId(job.indexTemplateName);

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

    logger.info(`Deleted Kibana index pattern: "${indexPatternId}"`);
  } catch (e) {
    if (e instanceof got.HTTPError) {
      const alreadyDeleted = e.response.statusCode === 404;
      if (alreadyDeleted) {
        logger.info(`Index pattern "${indexPatternId}" does not exist`);
        return;
      }
    }

    throw e;
  }
}
