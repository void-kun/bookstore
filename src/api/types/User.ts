import { Field, ID, ObjectType } from 'type-graphql';

import { Account } from './Account';

@ObjectType({
    description: 'User object.',
})
export class User {
    @Field((type) => ID)
    public id: number;

    @Field({
        description: 'The avatar of the user.',
    })
    public avatar: string;

    @Field({
        description: 'The role of the user.',
    })
    public role: string;

    @Field({
        description: 'The email of the user.',
    })
    public email: string;

    @Field((_type) => [Account], {
        description: 'The account of the user.',
    })
    public account: Account;

    @Field((_type) => [Date], {
        description: 'The createdAt of the user.',
    })
    public createdAt: Date;

    @Field((_type) => [Date], {
        description: 'The updatedAt of the user.',
    })
    public updatedAt: Date;
}
