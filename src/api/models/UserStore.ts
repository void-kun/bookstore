import {
    Entity,
    CreateDateColumn,
    BaseEntity,
    JoinTable,
    OneToOne,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity({ name: 'user_store' })
export class UserStore extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @OneToOne((_type) => Book)
    @JoinTable()
    public book!: Book;

    @ManyToOne((_type) => User)
    @JoinColumn()
    public user!: User;

    @Column()
    public location!: number;

    @Column('varchar', { length: 200 })
    public storeName!: string;

    @ManyToMany((_type) => Book)
    @JoinTable({ name: 'store_book' })
    public books!: Book[];

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}
