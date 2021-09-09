import { MappingPropertyBase } from '@elastic/elasticsearch/api/types';
import { Job } from './Job';

export function getCommonFields(job: Job) {
  return {
    huemon: {
      interval: {
        timestamp: new Date().toISOString(),
        duration: job.interval,
      },
    },
  };
}

export function getCommonFieldMappings(): MappingPropertyBase {
  return {
    properties: {
      interval: {
        dynamic: false,
        properties: {
          timestamp: { type: 'date' },
          duration: { type: 'integer' },
        },
      },
    },
  };
}
