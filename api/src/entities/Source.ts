import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'source' })
export class Source extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 200 })
  name!: string;

  @Column('varchar', { length: 255 })
  slug!: string;

  @Column('varchar', { length: 255 })
  url!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
