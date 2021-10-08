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
    public id!: number;

    @Column('varchar', { length: 200 })
    public name!: string;

    @Column('varchar', { length: 255 })
    public slug!: string;

    @Column('varchar', { length: 255 })
    public url!: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
