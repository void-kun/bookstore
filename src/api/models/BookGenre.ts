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
    public bookId!: number;

    @PrimaryColumn({ type: 'int' })
    public genreId!: number;

    @OneToOne(() => Book)
    @JoinTable()
    public book!: Book;

    @OneToOne(() => Genre)
    @JoinTable()
    public genre!: Genre;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
