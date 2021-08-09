import got from 'got';
import { Job } from '../../lib/Job';
import { createIndexPattern } from '../../lib/create_index_pattern';
import { EnvConfig } from '../../lib/get_env';
import { HueApiLight } from './api_sample';

export const hueJob: Job = {
  interval: 1000 * 60,
  indexTemplateName: 'hue-lights',
  indexTemplateMappings: {
    dynamic: false,
    properties: {
      name: { type: 'keyword' },
      '@timestamp': { type: 'date' },
      hour_of_day: { type: 'byte' },
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

  createKibanaAssets: (envConfig: EnvConfig) => {
    return createIndexPattern(envConfig, {
      override: true,
      index_pattern: {
        title: `${hueJob.indexTemplateName}*`,
      },
    });
  },

  getDocs: async (envConfig: EnvConfig) => {
    const res = (await got
      .get(`${envConfig.hue.api.host}/api/${envConfig.hue.api.key}/lights`, {
        timeout: { request: 5000 },
      })
      .json()) as HueApiLight;

    const now = new Date();
    const lights = Object.values(res).map((light) => {
      return {
        name: light.name,
        '@timestamp': now.toISOString(),
        hour_of_day: now.getHours(),
        state: {
          reachable: light.state.reachable,
          on: light.state.on,
          // @ts-expect-error: ignore the fact that `ct` is optional
          color_temperature: light.state.ct,
          brightness: light.state.bri,
        },
      };
    });

    return lights;
  },
};
