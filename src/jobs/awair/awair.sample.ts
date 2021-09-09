export type AwairApiResponse = typeof awairApiResponseSample;
export const awairApiResponseSample = {
  data: [
    {
      timestamp: '2021-08-03T21:23:08.000Z',
      score: 85.0,
      sensors: [
        {
          comp: 'temp',
          value: 22.530000686645508,
        },
        {
          comp: 'pm25',
          value: 3.0,
        },
        {
          comp: 'voc',
          value: 511.0,
        },
        {
          comp: 'humid',
          value: 54.5099983215332,
        },
        {
          comp: 'co2',
          value: 897.0,
        },
      ],
      indices: [
        {
          comp: 'voc',
          value: 1.0,
        },
        {
          comp: 'humid',
          value: 1.0,
        },
        {
          comp: 'co2',
          value: 1.0,
        },
        {
          comp: 'temp',
          value: 0.0,
        },
        {
          comp: 'pm25',
          value: 0.0,
        },
      ],
    },
  ],
};
