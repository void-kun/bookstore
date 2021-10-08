import * as express from 'express';
import {
    MicroframeworkLoader,
    MicroframeworkSettings,
} from 'microframework-w3tec';
import * as path from 'path';

export const publicLoader: MicroframeworkLoader = (
    setting: MicroframeworkSettings | undefined
) => {
    if (!setting) {
        return;
    }

    const expressApp = setting.getData('express_app');
    expressApp.use(
        express.static(path.join(__dirname, '..', 'public'), {
            maxAge: 31557600000,
        })
    );
};
