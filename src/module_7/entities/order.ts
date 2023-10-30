import { Schema, model } from 'mongoose';

import { CartItemSchema } from './cartItem';
import { OrderModel } from './types';

export const OrderSchema = new Schema<OrderModel>({
    user: {
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
    comments: {
        type: String,
        required: true,
    },
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

// @Entity()
// class Order {
//     @PrimaryKey()
//     id: string = uuidv4();
//
//     @ManyToOne(() => User)
//     user!: UserModel;
//
//     @Property()
//     cartId: string;
//
//     @Property({ type: 'json' })
//     items: CartItemEntity[];
//
//     @Property({ type: 'json' })
//     payment: {
//         type: string;
//         address?: string;
//         creditCard?: string;
//     };
//
//     @Property({ type: 'json' })
//     delivery: {
//         type: string;
//         address: string;
//     };
//
//     @Property({ nullable: true })
//     comments: string;
//
//     @Property()
//     status: string;
//
//     @Property()
//     total: number;
//
//     constructor(
//         user: UserModel,
//         cartId: string,
//         items: CartItemEntity[],
//         payment: {
//             type: string;
//             address?: string;
//             creditCard?: string;
//         },
//         delivery: {
//             type: string;
//             address: string;
//         },
//         status: string,
//         total: number,
//         comments: string
//     ) {
//         this.user = user;
//         this.cartId = cartId;
//         this.items = items;
//         this.payment = payment;
//         this.delivery = delivery;
//         this.status = status;
//         this.total = total;
//         this.comments = comments;
//     }
// }
//
// export default Order;
