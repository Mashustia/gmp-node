import {
    Collection,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import Cart from './cart';
import Order from './order';
import { CartModel } from './types';

@Entity()
class User {
    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    email!: string;

    @OneToOne(() => Cart, { nullable: true })
    cart?: CartModel;

    @OneToMany(() => Order, (order) => order.user)
    orders = new Collection<Order>(this);

    constructor(email: string) {
        this.email = email;
    }
}

export default User;
