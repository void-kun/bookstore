import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  PrimaryColumn,
  JoinTable,
  OneToOne,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book';
import { UserStore } from './UserStore';

@Entity({ name: 'store_book' })
export class StoreBook extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  bookId!: number;

  @PrimaryColumn({ type: 'int' })
  userStoreId!: number;

  @OneToOne(() => Book)
  @JoinTable()
  book!: Book;

  @OneToOne(() => UserStore)
  @JoinTable()
  store!: UserStore;

  @Column()
  location!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
