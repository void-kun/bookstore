import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '../utils/config.util';

const isCompiled = path.extname(__filename).includes('js');
const connectOpt: ConnectionOptions = {
  type: 'postgres',
  ...dbConfig,
  entities: [`src/entities/**/*.${isCompiled ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isCompiled ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
};

export default connectOpt;
