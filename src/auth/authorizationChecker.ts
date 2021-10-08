import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';
import { Container } from 'typedi';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authrizationChecker(
    connection: Connection
): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(
        action: Action,
        roles: any[]
    ): Promise<boolean> {
        const credentials = authService.parseBasicAuthFromRequest(
            action.request
        );

        if (credentials === undefined) {
            log.warn('No credentials given');
            return false;
        }

        action.request.user = await authService.validateUser(
            credentials.username,
            credentials.password
        );
        if (action.request.user === undefined) {
            log.warn('Invalid credentials given');
            return false;
        }

        log.info('Successfully checked credentials');
        return true;
    };
}
