import { jobs } from './jobs/jobs';
import { bulkIngest, getEsClient } from './lib/elasticsearch';
import { getEnvConfig } from './lib/get_env';

async function init() {
  const envConfig = getEnvConfig();
  const esClient = getEsClient(envConfig);

  const promises = jobs.map(async (job) => {
    // setup ES (index templates, data streams etc)
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

    // set kibana (index patterns, visualisations etc)
    if (job.createKibanaAssets) {
      await job.createKibanaAssets(envConfig);
    }

    // ingest data
    const fn = async () => {
      try {
        const docs = await job.getDocs(envConfig);
        await bulkIngest(esClient, docs, job.indexTemplateName);
      } catch (e) {
        console.error(`Job "${job.indexTemplateName}": An error occurred`, e);
      }
    };

    console.log(
      `Job "${job.indexTemplateName}": Starting interval at ${
        job.interval / 1000
      }s`
    );
    await fn();

    setInterval(fn, job.interval);
  });

  return Promise.all(promises);
}

init()
  .then(() => {
    console.log('Huemon started');
  })
  .catch((e) => {
    console.error('Huemon failed to start', e);
  });
