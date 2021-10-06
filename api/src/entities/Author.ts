import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'author' })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 200 })
  name!: string;

  @Column('varchar', { length: 255 })
  slug!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
