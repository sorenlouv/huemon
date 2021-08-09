import { awairJob } from './awair/awair_job';
import { hueLightsJob } from './hue/hue_lights_job';
import { hueSensorsJob } from './hue/hue_sensors_job';

export const jobs = [hueLightsJob, hueSensorsJob, awairJob];
