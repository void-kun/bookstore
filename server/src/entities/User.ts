import { Book } from './Book';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
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
  id!: number;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  username!: string;

  @Column('varchar', { length: 255 })
  avatar?: string;

  @Column({ type: 'simple-enum', enum: UserRole, default: UserRole.USER_ROLE })
  role!: UserRole;

  @ManyToMany((_type) => Book)
  @JoinTable({ name: 'book_user_reading' })
  booksReading!: Book[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
