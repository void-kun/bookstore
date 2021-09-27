import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  PrimaryColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Genre } from './Genre';
import { Book } from './Book';

@Entity({ name: 'book_genre' })
export class BookGenre extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  bookId!: number;

  @PrimaryColumn({ type: 'int' })
  genreId!: number;

  @OneToOne(() => Book)
  @JoinTable()
  book!: Book;

  @OneToOne(() => Genre)
  @JoinTable()
  genre!: Genre;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
