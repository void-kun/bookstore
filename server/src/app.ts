import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { loggerMiddleware } from './middlewares';
import { TryDBConnect } from './utils/database.util';
import { LOG_DB_MESSAGE } from './utils/constant.util';

const app: Express = express();
const database = async (_req: Request, res: Response, next: NextFunction) => {
  await TryDBConnect(() => {
    res.json({ error: LOG_DB_MESSAGE['DBERR001'] });
  }, next);
};

// middleware
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(database);

export default app;
