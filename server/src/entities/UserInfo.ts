import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export enum UserRole {
  ADMIN_ROLE = '1',
  USER_ROLE = '0',
}

@Entity({ name: 'user_info' })
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  username!: string;

  @Column('varchar', { length: 255 })
  avatar?: string;

  @Column({ type: 'simple-enum', enum: UserRole, default: UserRole.USER_ROLE })
  role!: UserRole;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
