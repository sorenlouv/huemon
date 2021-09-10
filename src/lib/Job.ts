import { MappingPropertyBase } from '@elastic/elasticsearch/api/types';
import { EnvConfig } from './get_env';

export type Job = {
  name: string;
  indexTemplateMappings: MappingPropertyBase;
  getDocs: (envConfig: EnvConfig) => Promise<Doc[]>;
  indexTemplateName: string;
  indexPattern: {
    title: string;
    timeFieldName: string;
  };
  interval: number;
};

export type Doc = Record<string, unknown> & {
  '@timestamp': string;
};
