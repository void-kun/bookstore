import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity({ name: 'genre' })
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 200 })
  name!: string;

  @Column('varchar', { length: 255 })
  slug!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}
