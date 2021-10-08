import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import {
    MicroframeworkLoader,
    MicroframeworkSettings,
} from 'microframework-w3tec';

import { env } from '../env';

export const monitorLoader: MicroframeworkLoader = (
    setting: MicroframeworkSettings | undefined
) => {
    if (setting && env.monitor.enabled) {
        const expressApp = setting.getData('express_app');
        expressApp.use(monitor());
        expressApp.get(
            env.monitor.route,
            env.monitor.username
                ? basicAuth({
                      users: {
                          [`${env.monitor.username}`]: env.monitor.password,
                      },
                      challenge: true,
                  })
                : (req, res, next) => next(),
            monitor().pageRoute
        );
    }
};
