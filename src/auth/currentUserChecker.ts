import { Action } from 'routing-controllers';
import { Connection } from 'typeorm';

import { Account } from './../api/models/Account';

export function currentUserChecker(
    connection: Connection
): (action: Action) => Promise<Account | undefined> {
    return async function innerCurrentUserChecker(
        action: Action
    ): Promise<Account | undefined> {
        return action.request.user;
    };
}
