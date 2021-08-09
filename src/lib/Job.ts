import { EnvConfig } from './get_env';

export type Job = {
  indexTemplateMappings: Record<string, any>;
  getDocs: (envConfig: EnvConfig) => Promise<any[]>;
  createKibanaAssets: ((envConfig: EnvConfig) => Promise<any>) | undefined;
  indexTemplateName: string;
  interval: number;
};
