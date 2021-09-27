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
  bookId!: number;

  @PrimaryColumn({ type: 'int' })
  userId!: number;

  @OneToOne(() => Book)
  @JoinTable()
  book!: Book;

  @OneToOne(() => User)
  @JoinTable()
  user!: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
