import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { jobs } from './jobs/jobs';
import { init } from './lib/init';
import { logger } from './lib/logging';
import { reset } from './reset';

const { argv } = yargs(hideBin(process.argv))
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

const p = argv.reset ? reset(selectedJobs) : init(selectedJobs);
p.then(() => {
  logger.info('✅ Success');
}).catch((e) => {
  logger.error('❌ Failed', e);

  if (e.response) {
    logger.info(e.request.options.url.href);
    logger.info(e.response.body);
  }
});
