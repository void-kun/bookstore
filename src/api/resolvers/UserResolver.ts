import DataLoader from 'dataloader';
import { DLoader, Logger, LoggerInterface } from '../../decorators';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Account as AccountModel, User as UserModel } from '../models';
import { UserService } from '../services/UserService';
import { User } from '../types/User';
import { Context } from '../Context';

@Service()
@Resolver((of) => User)
export class UserResolver {
    constructor(
        private userService: UserService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(AccountModel)
        private accountLoader: DataLoader<string, AccountModel>
    ) {}

    @Query((returns) => [User])
    public users(@Ctx() { requestId }: Context): Promise<any> {
        this.log.info(`{${requestId}} Find all users`);
        return this.userService.find();
    }

    @Query((returns) => User)
    public user(
        @Arg('username') username: string
    ): Promise<UserModel | undefined> {
        this.log.info(`Find user by username`);
        this.accountLoader.load('');
        return this.userService.findByUsername(username);
    }
}
