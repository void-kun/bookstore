import { Book } from './Book';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from 'typeorm';

export enum UserRole {
    ADMIN_ROLE = '1',
    USER_ROLE = '0',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('varchar', { length: 255 })
    public avatar?: string;

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        default: UserRole.USER_ROLE,
    })
    public role!: UserRole;

    @ManyToMany((_type) => Book)
    @JoinTable({ name: 'book_user_reading' })
    public booksReading!: Book[];

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}
