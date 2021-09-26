import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_info' })
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Index({ unique: true })
  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 255 })
  avatar: string = '';

  @Column('char', { length: 1 })
  role: string = '0';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
