import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { jobs } from './jobs/jobs';
import { init } from './lib/init';
import { logger } from './lib/logging';
import { reset } from './reset';

const { argv } = yargs(hideBin(process.argv))
  .option('onlySetup', {
    default: false,
    type: 'boolean',
    description: 'Only run the setup',
  })
  .option('onlyIngest', {
    default: false,
    type: 'boolean',
    description: 'Only ingest documents (no ingestion)',
  })
  .option('reset', {
    default: false,
    type: 'boolean',
    description: 'Reset',
  })
  .option('job', {
    alias: 'j',
    type: 'array',
    string: true,
    description: 'Start one or more jobs',
    choices: jobs.map((job) => job.name),
  });

const selectedJobs = jobs.filter((job) => {
  if (!argv.job) {
    return true;
  }

  return argv.job.includes(job.name);
});

const { onlyIngest, onlySetup } = argv;

const p = argv.reset
  ? reset(selectedJobs)
  : init(selectedJobs, { onlyIngest, onlySetup });

p.then(() => {
  logger.info('✅ Started huemon successfully');
}).catch((e) => {
  logger.error(`❌ Could not start huemon: ${e.message}`);
  logger.error(e.stack);

  if (e.response) {
    logger.info(e.request.options.url.href);
    logger.info(e.response.body);
  }
});
