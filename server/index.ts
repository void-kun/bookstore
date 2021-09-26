import { Express } from 'express';
require('dotenv').config({
  // path: process.env.NODE_ENV === 'development' ? './.env.dev' : './.env.prod',
  path: './.env.dev',
});

import app from './src/app';
import Logger from './src/utils/logger.util';

const PORT = parseInt(process.env.PORT as string, 10) || 8081;

const server = (app: Express) => {
  app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
  });
};

server(app);
