import got from 'got';
import { Job } from '../../lib/Job';
import { EnvConfig } from '../../lib/get_env';
import { AwairApiResponse } from './awair.sample';

export const awairJob: Job = {
  name: 'awair',
  interval: 1000 * 60 * 5,
  indexTemplateName: 'awair',
  indexPattern: {
    title: 'awair*',
    timeFieldName: '@timestamp',
  },
  indexTemplateMappings: {
    dynamic: false,
    properties: {
      '@timestamp': { type: 'date' },
      hour_of_day: { type: 'byte' },
      day_of_week: { type: 'byte' },
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

    const date = new Date(firstItem.timestamp);
    return [
      {
        '@timestamp': date.toISOString(),
        hour_of_day: date.getHours(),
        day_of_week: date.getDay(),
        score: firstItem.score,
        sensors,
        sensor_scores: sensorScores,
      },
    ];
  },
};
