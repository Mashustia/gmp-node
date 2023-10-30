import { Schema, model } from 'mongoose';

import { CartItemSchema } from './cartItem';
import { CartModel, ICart, ICartMethods } from './types';

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

CartSchema.methods.clearCart = function () {
    this.items = [];
}

const Cart = model<ICart, CartModel>('Cart', CartSchema)

export default Cart;
