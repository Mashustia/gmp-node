import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import User from './user';
import { CartItemEntity } from '../../module_6/dataBase/carts';
import { UserModel } from './types';

@Entity()
class Order {
    @PrimaryKey()
    id: string = uuidv4();

    @ManyToOne(() => User)
    user!: UserModel;

    @Property()
    cartId: string;

    @Property({ type: 'json' })
    items: CartItemEntity[];

    @Property({ type: 'json' })
    payment: {
        type: string;
        address?: string;
        creditCard?: string;
    };

    @Property({ type: 'json' })
    delivery: {
        type: string;
        address: string;
    };

    @Property({ nullable: true })
    comments: string;

    @Property()
    status: string;

    @Property()
    total: number;

    constructor(
        user: UserModel,
        cartId: string,
        items: CartItemEntity[],
        payment: {
            type: string;
            address?: string;
            creditCard?: string;
        },
        delivery: {
            type: string;
            address: string;
        },
        status: string,
        total: number,
        comments: string
    ) {
        this.user = user;
        this.cartId = cartId;
        this.items = items;
        this.payment = payment;
        this.delivery = delivery;
        this.status = status;
        this.total = total;
        this.comments = comments;
    }
}

export default Order;
