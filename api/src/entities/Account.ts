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
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
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
  username!: string;

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

  @BeforeInsert()
  genSalt() {
    this.salt = bcrypt.genSaltSync(12);
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.hash = bcrypt.hashSync(this.hash, this.salt);
  }

  checkPasswordIsValid(password: string) {
    return bcrypt.compareSync(password, this.hash);
  }
}
