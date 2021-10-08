import { EntityRepository, Repository } from 'typeorm';

import { Account } from '../models';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {}
