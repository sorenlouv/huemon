import { jobs } from './jobs/jobs';
import {
  deleteDataStreamAndIndexTemplate,
  getEsClient,
} from './lib/elasticsearch';
import { getEnvConfig } from './lib/get_env';

async function reset() {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  await Promise.all(
    jobs.map((job) => {
      console.log(
        `Job: "${job.indexTemplateName}": Deleting index template and data`
      );
      return deleteDataStreamAndIndexTemplate(esClient, job.indexTemplateName);
    })
  );
}

reset()
  .then(() => {
    console.log('✅ Reset was successful');
  })
  .catch((e) => {
    console.error('❌ Reset failed', e);
  });
