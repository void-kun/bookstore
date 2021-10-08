import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { Author } from './Author';
import { Genre } from './Genre';
import { Source } from './Source';

export enum BookStatus {
    FINISHED = '1',
    CONTINUE = '0',
    STOP = '-1',
}

@Entity({ name: 'book' })
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column('varchar', { length: 200 })
    public title!: string;

    @Column('varchar', { length: 255 })
    public slug!: string;

    @Column('text')
    public summary!: string;

    @Column('int')
    public visibility!: number;

    @Column('int')
    public star!: number;

    @Column({
        type: 'simple-enum',
        enum: BookStatus,
        default: BookStatus.CONTINUE,
    })
    public status!: BookStatus;

    @ManyToOne((_type) => Author)
    @JoinColumn()
    public author!: Author;

    @ManyToOne((_type) => Source)
    @JoinColumn()
    public source!: Source;

    @ManyToMany((_type) => Genre)
    @JoinTable({ name: 'book_genre' })
    public genres!: Genre[];

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}
