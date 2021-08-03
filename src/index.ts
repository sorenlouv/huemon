import { awairJob } from './jobs/awair/awair_job';
import { hueJob } from './jobs/hue/hue_job';
import {
  bulkIngest,
  deleteDataStreamAndIndexTemplate,
  getEsClient,
} from './lib/elasticsearch';
import { getEnvConfig } from './lib/get_env';

const jobs = [hueJob, awairJob];

async function init() {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  // if (envConfig.resetOnStartup) {
  await Promise.all(
    jobs.map((job) => {
      console.log(
        `Job: "${job.indexTemplateName}": Deleting index template and data`
      );
      return deleteDataStreamAndIndexTemplate(esClient, job.indexTemplateName);
    })
  );
  // }

  jobs.map(async (job) => {
    console.log(`Job: "${job.indexTemplateName}": Creating index template`);
    await esClient.indices.putIndexTemplate({
      name: job.indexTemplateName,
      create: false, // allow updating existing template
      body: {
        index_patterns: [`${job.indexTemplateName}*`],
        data_stream: {},
        template: {
          settings: { number_of_shards: 1 },
          mappings: job.indexTemplateMappings,
        },
      },
    });
  });

  jobs.map(async (job) => {
    console.log(
      `Job "${job.indexTemplateName}": Starting interval at ${
        job.interval / 1000
      }s`
    );

    const docs = await job.getDocs(envConfig);
    await bulkIngest(esClient, docs, job.indexTemplateName);

    // setInterval(async () => {
    //   const docs = await job.getDocs(envConfig);
    //   await bulkIngest(esClient, docs, job.indexTemplateName);
    // }, job.interval);
  });
}

init()
  .then(() => {
    console.log('Huemon started');
  })
  .catch((e) => {
    console.error('Huemon failed to start', e);
  });
