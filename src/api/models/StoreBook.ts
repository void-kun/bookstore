import {
    Entity,
    CreateDateColumn,
    BaseEntity,
    PrimaryColumn,
    JoinTable,
    OneToOne,
    Column,
    UpdateDateColumn,
} from 'typeorm';
import { Book } from './Book';
import { UserStore } from './UserStore';

@Entity({ name: 'store_book' })
export class StoreBook extends BaseEntity {
    @PrimaryColumn({ type: 'int' })
    public bookId!: number;

    @PrimaryColumn({ type: 'int' })
    public userStoreId!: number;

    @OneToOne(() => Book)
    @JoinTable()
    public book!: Book;

    @OneToOne(() => UserStore)
    @JoinTable()
    public store!: UserStore;

    @Column()
    public location!: number;

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}
