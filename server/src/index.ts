import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';

import { loggerMiddleware } from './middlewares';
import { DBConnect } from './utils/database.util';
import { redisClient } from './utils/redis.util';
import { sessionConfig, cookieConfig } from './utils/config.util';
import routes from './routes';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userData: string | jwt.JwtPayload;
      token: string;
    }
  }
}

const app: Express = express();
(async () => {
  await DBConnect();
})();

const RedisStore = connectRedis(session);
const redisSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: sessionConfig.secret,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
});
const handleError = (_req: Request, res: Response) => {
  res.send();
};

// middleware
app.use(cors());
app.use(express.json());
app.use(redisSession);
app.use('/api/v1', routes);
// static files
app.use('/static', express.static('static'));
app.use(loggerMiddleware);
app.use(handleError);

export default app;
