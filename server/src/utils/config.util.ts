interface INodeConfig {
  node_env: string
}

const nodeConfig: INodeConfig = {
  node_env: process.env.NODE_ENV || 'development',
};

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNC == 'true',
  logging: process.env.DB_LOGGING == 'true',
  autoReconnect: process.env.DB_AUTORECONNECT == 'true',
  reconnectTries: parseInt(process.env.DB_RECONNECT_TRIES),
  reconnectInterval: parseInt(process.env.DB_RECONNECT_INTERVAL),
};

interface IRedisConfig {
  port: number
  host: string
};

const redisConfig: IRedisConfig = {
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST
};

interface ISessionConfig {
  secret: string
};

const sessionConfig: ISessionConfig = {
  secret: process.env.SESSION_SECRET
};

interface ICookieConfig {
  secure: boolean
  httpOnly: boolean
  maxAge: number
  sameSite: any
};

const cookieConfig: ICookieConfig = {
  secure: process.env.COOKIE_SECURE === 'true',
  httpOnly: process.env.COOKIE_HTTPONLY === 'true',
  maxAge: parseInt(process.env.COOKIE_MAXAGE),
  sameSite: process.env.COOKIE_SAMESITE,
}

export { nodeConfig, dbConfig, redisConfig, sessionConfig, cookieConfig };

