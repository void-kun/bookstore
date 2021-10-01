import { createClient } from 'redis';
import { redisConfig } from './config.util';

export const redisClient = createClient(redisConfig);

