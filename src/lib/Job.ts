import { EnvConfig } from './get_env';

export type Job = {
  indexTemplateMappings: Record<string, any>;
  getDocs: (envConfig: EnvConfig) => Promise<any[]>;
  indexTemplateName: string;
  indexPattern?: {
    title: string;
    timeFieldName: string;
  };
  interval: number;
};
