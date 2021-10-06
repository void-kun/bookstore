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
  id!: number;

  @Column('varchar', { length: 200 })
  title!: string;

  @Column('varchar', { length: 255 })
  slug!: string;

  @Column('text')
  summary!: string;

  @Column('int')
  visibility!: number;

  @Column('int')
  star!: number;

  @Column({
    type: 'simple-enum',
    enum: BookStatus,
    default: BookStatus.CONTINUE,
  })
  status!: BookStatus;

  @ManyToOne((_type) => Author)
  @JoinColumn()
  author!: Author;

  @ManyToOne((_type) => Source)
  @JoinColumn()
  source!: Source;

  @ManyToMany((_type) => Genre)
  @JoinTable({ name: 'book_genre' })
  genres!: Genre[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
