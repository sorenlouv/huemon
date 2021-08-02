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
      dataStreamName: process.env.DATA_STREAM_NAME || 'hue-lights',
      indexTemplateName: process.env.INDEX_TEMPLATE_NAME || 'hue-lights',
    },
    resetOnStartup: process.env.RESET_ON_STARTUP === 'true',
  };

  if (
    !config.elastic.cloudId ||
    !config.elastic.username ||
    !config.elastic.password
  ) {
    throw new Error('Invalid config');
  }

  return config;
}
