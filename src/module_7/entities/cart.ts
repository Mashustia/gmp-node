import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import User from './user';
import Product from './product';
import { CartItemEntity } from '../../module_6/dataBase/carts';

@Entity()
class Cart {
    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    isDeleted: boolean = false;

    @Property({ type: 'jsonb' })
    items: CartItemEntity[] = [];

    @ManyToOne(() => User)
    user!: User;

    constructor(user: User) {
        this.user = user;
    }

    addItem(product: Product, count: number) {
        const isExistingItem = this.items.find(
            (item) => item.product.id === product.id
        );
        if (isExistingItem) {
            isExistingItem.count += count;
        } else {
            this.items.push({ product, count });
        }
    }
}

export default Cart;
