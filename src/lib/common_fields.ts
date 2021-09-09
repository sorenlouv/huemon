import { MappingPropertyBase } from '@elastic/elasticsearch/api/types';
import { Doc, Job } from './Job';

export function getCommonFields(job: Job, doc: Doc) {
  const now = Date.now();
  const ingestTimestamp = new Date(now).toISOString();
  return {
    huemon: {
      interval: {
        timestamp: ingestTimestamp,
        duration: job.interval,
        ingest_lag: now - new Date(doc['@timestamp']).getTime(),
      },
    },
  };
}

export function getCommonFieldMappings(): MappingPropertyBase {
  return {
    dynamic: false,
    properties: {
      huemon: {
        dynamic: false,
        properties: {
          interval: {
            dynamic: false,
            properties: {
              timestamp: { type: 'date' },
              duration: { type: 'integer' },
              ingest_lag: { type: 'long' },
            },
          },
        },
      },
    },
  };
}
