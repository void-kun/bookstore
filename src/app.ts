import 'reflect-metadata';

import { bootstrapMicroframework } from 'microframework-w3tec';

import { banner } from './lib/banner';
import { Logger } from './lib/logger';
import { eventDispatchLoader } from './loaders/eventDispatchLoader';
import { expressLoader } from './loaders/expressLoader';
import { graphQLLoader } from './loaders/graphqlLoader';
import { homeLoader } from './loaders/homeLoader';
import { iocLoader } from './loaders/iocLoader';
import { monitorLoader } from './loaders/monitorLoader';
import { publicLoader } from './loaders/publicLoader';
// import { swaggerLoader } from './loaders/swaggerLoader';
import { typeormLoader } from './loaders/typeormLoader';
import { winstonLoader } from './loaders/winstonLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
    loaders: [
        winstonLoader,
        iocLoader,
        eventDispatchLoader,
        typeormLoader,
        expressLoader,
        // swaggerLoader,
        monitorLoader,
        homeLoader,
        publicLoader,
        graphQLLoader,
    ],
})
    .then(() => banner(log))
    .catch((error) => log.error('Application is crashed: ' + error));
