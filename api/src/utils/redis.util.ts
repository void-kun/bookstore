import { createClient } from 'redis';
import { redisConfig } from './config.util';
import Logger from './logger.util';
import message from '../data/message.json';

const redisClient = createClient(redisConfig);
redisClient.on('connect', function () {
  Logger.info(message.log.redis.RDINFO001);
});

export { redisClient };
