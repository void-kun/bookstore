import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { loggerMiddleware } from './middlewares';
import { TryDBConnect } from './utils/database.util';
import { LOG_DB_MESSAGE } from './utils/constant.util';
import { redisClient } from './utils/redis.util';
import { sessionConfig, cookieConfig } from './utils/config.util';
import routes from './routes';

const app: Express = express();
const database = async (_req: Request, res: Response, next: NextFunction) => {
  await TryDBConnect(() => {
    res.json({ error: LOG_DB_MESSAGE['DBERR001'] });
  }, next);
};

const RedisStore = connectRedis(session);
const redisSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
});

// middleware
app.use(cors());
app.use(express.json());
app.use(redisSession);
app.use(database);
app.use(routes);
app.use(loggerMiddleware);

export default app;
