import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserInfo } from './UserInfo';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @OneToOne((_type) => UserInfo)
  @JoinColumn()
  user: UserInfo;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 255 })
  hash: string;

  @Column('varchar', { length: 50 })
  salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}