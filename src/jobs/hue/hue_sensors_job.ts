import got from 'got';
import { Job } from '../../lib/Job';
import { EnvConfig } from '../../lib/get_env';
import { SensorsApi } from './sensors_api_sample';

export const hueSensorsJob: Job = {
  name: 'hue-sensors',
  interval: 1000 * 60 * 5,
  indexTemplateName: 'hue-sensors',
  indexPattern: {
    title: 'hue-sensors*',
    timeFieldName: '@timestamp',
  },
  indexTemplateMappings: {
    dynamic: false,
    properties: {
      name: {
        type: 'text',
        fields: {
          keyword: {
            type: 'keyword',
          },
        },
      },
      room: { type: 'keyword' },
      '@timestamp': { type: 'date' },
      hour_of_day: { type: 'byte' },
      day_of_week: { type: 'byte' },
      product_name: { type: 'keyword' },
      type: { type: 'keyword' },
      state: {
        dynamic: true,
        properties: {
          // light sensor
          lightlevel: { type: 'short' },
          dark: { type: 'boolean' },
          daylight: { type: 'boolean' },

          // temp sensor
          temperature: { type: 'float' },

          // motion sensor
          presence: { type: 'boolean' },

          // common
          reachable: { type: 'boolean' },
          lastupdated: { type: 'date' },
        },
      },
    },
  },

  getDocs: async (envConfig: EnvConfig) => {
    const res = (await got
      .get(`${envConfig.hue.api.host}/api/${envConfig.hue.api.key}/sensors`, {
        timeout: { request: 5000 },
      })
      .json()) as SensorsApi;

    return Object.values(res)
      .filter((sensor) =>
        ['ZLLLightLevel', 'ZLLPresence', 'ZLLTemperature'].includes(sensor.type)
      )
      .map((sensor) => {
        const date = new Date(`${sensor.state.lastupdated}Z`);
        const [room] = sensor.name.split(',');
        return {
          name: sensor.name,
          room,
          '@timestamp': date.toISOString(),
          hour_of_day: date.getHours(),
          day_of_week: date.getDay(),
          //@ts-expect-error: `productname` is optional
          product_name: sensor.productname,
          state: {
            ...sensor.state,
            temperature:
              'temperature' in sensor.state
                ? sensor.state.temperature / 100
                : undefined,
            //@ts-expect-error: `reachable` is optional
            reachable: sensor.config.reachable,
          },
          type: sensor.type,
        };
      });
  },
};
