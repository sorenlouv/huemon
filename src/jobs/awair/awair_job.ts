import got from 'got';
import { Job } from '../../lib/Job';
import { EnvConfig } from '../../lib/get_env';
import { AwairApiResponse } from './api_sample';

export const awairJob: Job = {
  interval: 1000 * 60 * 5,
  indexTemplateName: 'awair',
  indexTemplateMappings: {
    dynamic: false,
    properties: {
      '@timestamp': { type: 'date' },
      hour_of_day: { type: 'byte' },
      score: { type: 'float' },
      sensor_scores: {
        properties: {
          co2: { type: 'byte' },
          humid: { type: 'byte' },
          pm25: { type: 'byte' },
          temp: { type: 'byte' },
          voc: { type: 'byte' },
        },
      },
      sensors: {
        properties: {
          co2: { type: 'float' },
          humid: { type: 'float' },
          pm25: { type: 'float' },
          temp: { type: 'float' },
          voc: { type: 'float' },
        },
      },
    },
  },

  getDocs: async (envConfig: EnvConfig) => {
    const { awair } = envConfig;

    const res = (await got
      .get(
        `https://developer-apis.awair.is/v1/users/self/devices/${awair.device_type}/${awair.device_id}/air-data/latest`,
        {
          timeout: { request: 5000 },
          headers: { Authorization: `Bearer ${awair.token}` },
        }
      )
      .json()) as AwairApiResponse;

    const firstItem = res.data[0];

    const sensors = firstItem.sensors.reduce((memo, { comp, value }) => {
      memo[comp] = value;
      return memo;
    }, {} as Record<string, number>);

    const sensorScores = firstItem.indices.reduce((memo, { comp, value }) => {
      memo[comp] = value;
      return memo;
    }, {} as Record<string, number>);

    return [
      {
        '@timestamp': firstItem.timestamp,
        hour_of_day: new Date(firstItem.timestamp).getHours(),
        score: firstItem.score,
        sensors,
        sensor_scores: sensorScores,
      },
    ];
  },
};
