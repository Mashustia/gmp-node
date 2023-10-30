import { Schema, model } from 'mongoose';

import { CartItemSchema } from './cartItem';
import { OrderModel } from './types';

export const OrderSchema = new Schema<OrderModel>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    items: [CartItemSchema],
    payment: {
        type: {
            type: String,
            required: true,
        },
        address: String,
        creditCard: String,
    },
    delivery: {
        type: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    comments: String,
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
})

const Order = model<OrderModel>('Order', OrderSchema);

export default Order;
