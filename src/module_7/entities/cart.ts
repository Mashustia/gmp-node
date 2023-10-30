import { Schema, model } from 'mongoose';

import { CartItemSchema } from './cartItem';
import { CartItemEntity } from '../../module_6/dataBase/carts';
import { CartModel, ICart, ICartMethods, ProductData } from './types';

export const CartSchema = new Schema<ICart, CartModel, ICartMethods>({
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    items: [CartItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

CartSchema.methods.addItem = function (product: ProductData, count: number) {
    const isExistingItem = this.items.find(
        (item: CartItemEntity) => item.product.id === product.productId
    );
    if (isExistingItem) {
        isExistingItem.count += count;
    } else {
        this.items.push({ product, count });
    }
}

CartSchema.methods.clearCart = function () {
    this.items = [];
}

const Cart = model<ICart, CartModel>('Cart', CartSchema)

export default Cart;

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
