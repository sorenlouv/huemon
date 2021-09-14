import got from 'got';
import { EnvConfig } from '../../lib/get_env';
import { Job } from '../../lib/types';

type Sensor = {
  name: string;
  productname: string;
  config: { reachable: boolean };
  state: { lastupdated: string };
} & (
  | {
      type: 'ZLLPresence';
      state: {
        presence: boolean;
      };
    }
  | {
      type: 'ZLLTemperature';
      state: {
        temperature: number;
      };
    }
  | {
      type: 'ZLLLightLevel';
      state: {
        lightlevel: number;
        dark: boolean;
        daylight: boolean;
      };
    }
);

export const hueSensorsJob: Job = {
  name: 'hue-sensors',
  interval: 1000 * 5,
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
          original_presence: { type: 'boolean' },

          // common
          reachable: { type: 'boolean' },
          lastupdated: { type: 'date' },
        },
      },
    },
  },

  getDocs: async (envConfig: EnvConfig) => {
    const res: Sensor[] = await got
      .get(`${envConfig.hue.api.host}/api/${envConfig.hue.api.key}/sensors`, {
        timeout: { request: 5000 },
      })
      .json();

    return Object.values(res)
      .filter((sensor) =>
        ['ZLLLightLevel', 'ZLLPresence', 'ZLLTemperature'].includes(sensor.type)
      )
      .map((sensor) => {
        const didDetectPresence =
          new Date(sensor.state.lastupdated).getTime() >
          Date.now() - hueSensorsJob.interval;

        const dateNow = new Date();
        const [room] = sensor.name.split(',');
        return {
          name: sensor.name,
          room,
          '@timestamp': dateNow.toISOString(),
          hour_of_day: dateNow.getHours(),
          day_of_week: dateNow.getDay(),
          product_name: sensor.productname,
          state: {
            ...sensor.state,
            reachable: sensor.config.reachable,
            temperature:
              sensor.type === 'ZLLTemperature'
                ? sensor.state.temperature / 100
                : undefined,
            presence:
              sensor.type === 'ZLLPresence'
                ? sensor.state.presence || didDetectPresence
                : undefined,
            original_presence:
              sensor.type === 'ZLLPresence' ? sensor.state.presence : undefined,
          },
          type: sensor.type,
        };
      });
  },
};
