import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import {
    EventDispatcher,
    EventDispatcherInterface,
} from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User, Account } from '../models';
import { UserRepository, AccountRepository } from '../repositories';
import { events } from '../subscribers/events';

@Service()
export class UserService {
    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private accountRepository: AccountRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find({ relations: ['account'] });
    }

    public findByUsername(username: string): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({
            where: {
                username,
            },
        });
    }

    public async create(account: Account, user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        const newAccount: Account = this.accountRepository.create(account);
        user.account = newAccount;

        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: number, user: User): Promise<User> {
        this.log.info('Update a user');
        return this.userRepository.save(user);
    }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
    }
}
