import { Field, InputType, Int } from 'type-graphql';

import { Account } from '../Account';

@InputType()
export class AccountInput implements Partial<Account> {
    @Field()
    public username: string;

    @Field((type) => Int)
    public email: string;

    @Field((type) => Int)
    public hash: string;

    @Field((type) => Int)
    public salt: string;

    @Field((_type) => [Date])
    public createdAt: Date;

    @Field((_type) => [Date])
    public updatedAt: Date;
}
