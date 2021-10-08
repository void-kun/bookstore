import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './User';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
    public static comparePassword(account: Account, password: string): boolean {
        return bcrypt.compareSync(password, account.hash);
    }

    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToOne((_type) => User)
    @JoinColumn()
    public user!: User;

    @Index({ unique: true })
    @Column('varchar', { length: 50 })
    public username!: string;

    @Index({ unique: true })
    @Column('varchar', { length: 50 })
    public email!: string;

    @Column('varchar', { length: 255 })
    public hash!: string;

    @Column('varchar', { length: 50 })
    public salt!: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    @BeforeInsert()
    public genSalt(): void {
        this.salt = bcrypt.genSaltSync(12);
    }

    @BeforeInsert()
    @BeforeUpdate()
    public hashPassword(): void {
        this.hash = bcrypt.hashSync(this.hash, this.salt);
    }
}
