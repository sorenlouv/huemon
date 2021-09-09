import { awairJob } from './awair/awair.job';
import { hueLightsJob } from './hue/hue_lights.job';
import { hueSensorsJob } from './hue/hue_sensors.job';

export const jobs = [hueLightsJob, hueSensorsJob, awairJob];
