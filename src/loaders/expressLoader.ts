import {
    MicroframeworkLoader as Loader,
    MicroframeworkSettings as Setting,
} from 'microframework-w3tec';
import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';

import { authorizationChecker } from '../auth/authorizationChecker';
import { currentUserChecker } from '../auth/currentUserChecker';
import { env } from '../env';

export const expressLoader: Loader = (setting: Setting | undefined) => {
    if (!setting) {
        return;
    }

    const connection = setting.getData('connection');
    const expressApp: Application = createExpressServer({
        cors: true,
        classTransformer: true,
        routePrefix: env.app.routePrefix,
        defaultErrorHandler: false,

        controllers: env.app.dirs.controllers,
        middlewares: env.app.dirs.middlewares,
        interceptors: env.app.dirs.interceptors,

        authorizationChecker: authorizationChecker(connection),
        currentUserChecker: currentUserChecker(connection),
    });
    console.log(`Application running`);

    if (!env.isTest) {
        const server = expressApp.listen(env.app.port, () =>
            console.log(`Application running on port ${env.app.port}`)
        );
        setting.setData('express_server', server);
    }

    setting.setData('express_app', expressApp);
};
