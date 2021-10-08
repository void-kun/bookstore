import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AccountService } from '../services/AccountService';
import { Account as AccountModel } from './../models/Account';
import { Context } from '../Context';
import { Account } from '../types/Account';

@Service()
@Resolver((of) => Account)
export class AccountResolver {
    constructor(
        private accountService: AccountService,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    @Query((returns) => [Account])
    public accounts(@Ctx() { requestId }: Context): Promise<AccountModel[]> {
        this.log.info(`{${requestId}} Find all users`);
        return this.accountService.find();
    }

    public;
}
