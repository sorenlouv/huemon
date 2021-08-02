import dotenv from 'dotenv';

export function getEnvConfig() {
  const dotEnvConfig = dotenv.config();

  if (dotEnvConfig.error) {
    // @ts-expect-error
    if (dotEnvConfig.error.code === 'ENOENT') {
      console.error('Make sure to create a .env config file');
      process.exit(1);
    }
    throw dotEnvConfig.error;
  }

  const config = {
    hue: {
      api: {
        host: process.env.HUE_API_HOST,
        key: process.env.HUE_API_KEY,
      },
    },
    elastic: {
      username: process.env.ELASTIC_USERNAME as string,
      password: process.env.ELASTIC_PASSWORD as string,
      cloudId: process.env.ELASTIC_CLOUD_ID as string,
      dataStreamName: process.env.DATA_STREAM_NAME as string,
      indexTemplateName: process.env.INDEX_TEMPLATE_NAME as string,
    },
  };

  if (
    !config.elastic.cloudId ||
    !config.elastic.username ||
    !config.elastic.password ||
    !config.elastic.indexTemplateName ||
    !config.elastic.dataStreamName
  ) {
    throw new Error('Invalid config');
  }

  return config;
}
