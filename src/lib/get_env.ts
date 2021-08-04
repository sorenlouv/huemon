import dotenv from 'dotenv';

export type EnvConfig = ReturnType<typeof getEnvConfig>;
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
    awair: {
      device_type: process.env.AWAIR_DEVICE_TYPE,
      device_id: process.env.AWAIR_DEVICE_ID,
      token: process.env.AWAIR_TOKEN,
    },
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
    },
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
