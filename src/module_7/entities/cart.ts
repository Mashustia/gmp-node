import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { CartItemSchema } from './cartItem';
import { Product } from '../../module_6/repositories/cart';
import { CartItemEntity } from '../../module_6/dataBase/carts';

export const CartSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        alias: 'id',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
    },
    items: [CartItemSchema],
    user: { // maybe change to full user odk
        type: String,
        required: true,
    },
})

CartSchema.methods.addItem = function (product: Product, count: number) {
    const isExistingItem = this.items.find(
        (item: CartItemEntity) => item.product.id === product.productId
    );
    if (isExistingItem) {
        isExistingItem.count += count;
    } else {
        this.items.push({ product, count });
    }
}

model('Cart', CartSchema)

// @Entity()
// class Cart {
//     @PrimaryKey()
//     id: string = uuidv4();
//
//     @Property()
//     isDeleted: boolean = false;
//
//     @Property({ type: 'jsonb' })
//     items: CartItemEntity[] = [];
//
//     @ManyToOne(() => User)
//     user!: User;
//
//     constructor(user: User) {
//         this.user = user;
//     }
//
//     addItem(product: Product, count: number) {
//         const isExistingItem = this.items.find(
//             (item) => item.product.id === product.id
//         );
//         if (isExistingItem) {
//             isExistingItem.count += count;
//         } else {
//             this.items.push({ product, count });
//         }
//     }
// }
//
// export default Cart;
