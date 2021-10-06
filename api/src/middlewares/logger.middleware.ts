import morgan, { StreamOptions } from 'morgan';
import Logger from '../utils/logger.util';
import { nodeConfig } from '../utils/config.util';

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  return nodeConfig.node_env !== 'development';
};

const loggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
export default loggerMiddleware;
