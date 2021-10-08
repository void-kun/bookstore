import {
    Entity,
    CreateDateColumn,
    BaseEntity,
    PrimaryColumn,
    JoinTable,
    OneToOne,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity({ name: 'book_user_reading' })
export class BookUserReading extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    public bookId!: number;

    @PrimaryColumn({ type: 'int' })
    public userId!: number;

    @OneToOne(() => Book)
    @JoinTable()
    public book!: Book;

    @OneToOne(() => User)
    @JoinTable()
    public user!: User;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
