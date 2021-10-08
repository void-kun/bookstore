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
    public id!: number;

    @Column('varchar', { length: 200 })
    public name!: string;

    @Column('varchar', { length: 255 })
    public slug!: string;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;
}
