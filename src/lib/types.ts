import { MappingPropertyBase } from '@elastic/elasticsearch/api/types';
import { EnvConfig } from './get_env';

export type Job = {
  name: string;
  indexTemplateMappings: MappingPropertyBase;
  getDocs: (envConfig: EnvConfig) => Promise<Doc[]>;
  indexTemplateName: string;
  indexPattern: IndexPattern['index_pattern'];
  interval: number;
};

export type Doc = Record<string, unknown> & {
  '@timestamp': string;
};

export interface IndexPattern {
  override?: boolean;
  refresh_fields?: boolean;
  index_pattern: {
    // required
    title: string;
    timeFieldName: string;

    // optional
    id?: string;
    fieldFormats?: string;
  };
}
