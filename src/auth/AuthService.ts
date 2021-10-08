import { Request } from 'express';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Account } from '../api/models';
import { AccountRepository } from '../api/repositories';
import { Logger, LoggerInterface } from '../decorators/Logger';

interface IUserData {
    username: string;
    password: string;
}

@Service()
export class AuthService {
    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private accountRepository: AccountRepository
    ) {}

    public parseBasicAuthFromRequest(req: Request): IUserData {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(
                authorization.split(' ')[1],
                'base64'
            ).toString('ascii');

            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async validateUser(
        username: string,
        password: string
    ): Promise<Account> {
        const account = await this.accountRepository.findOne({
            where: {
                username,
            },
        });

        if (await Account.comparePassword(account, password)) {
            return account;
        }

        return undefined;
    }
}
