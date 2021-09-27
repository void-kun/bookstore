import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'account' })
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((_type) => User)
  @JoinColumn()
  user!: User;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  email!: string;

  @Column('varchar', { length: 255 })
  hash!: string;

  @Column('varchar', { length: 50 })
  salt!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
