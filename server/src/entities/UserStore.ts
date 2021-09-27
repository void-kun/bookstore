import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  JoinTable,
  OneToOne,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity({ name: 'user_store' })
export class UserStore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((_type) => Book)
  @JoinTable()
  book!: Book;

  @ManyToOne((_type) => User)
  @JoinColumn()
  user!: User;

  @Column()
  location!: number;

  @Column('varchar', { length: 200 })
  storeName!: string;

  @ManyToMany((_type) => Book)
  @JoinTable({ name: 'store_book' })
  books!: Book[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
