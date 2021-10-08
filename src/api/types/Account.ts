import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'Account object.',
})
export class Account {
    @Field((type) => ID)
    public id: number;

    @Field({
        description: 'The username of the account.',
    })
    public username: string;

    @Field((type) => Int, {
        description: 'The email of the account.',
    })
    public email: string;

    @Field((type) => Int, {
        description: 'The hash of the account.',
    })
    public hash: string;

    @Field((type) => Int, {
        description: 'The salt of the account.',
    })
    public salt: string;

    @Field((_type) => [Date], {
        description: 'The createdAt of the account.',
    })
    public createdAt: Date;

    @Field((_type) => [Date], {
        description: 'The updatedAt of the account.',
    })
    public updatedAt: Date;
}
