import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { CartSchema } from './cart';
import { OrderSchema } from './order';

const UserSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        alias: 'id',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        type: CartSchema,
        required: true,
    },
    orders: {
        type: [OrderSchema],
        required: true,
    },
});

model('User', UserSchema);

// @Entity()
// class User {
//     @PrimaryKey()
//     id: string = uuidv4();
//
//     @Property()
//     email!: string;
//
//     @OneToOne(() => Cart, { nullable: true })
//     cart?: CartModel;
//
//     @OneToMany(() => Order, (order) => order.user)
//     orders = new Collection<Order>(this);
//
//     constructor(email: string) {
//         this.email = email;
//     }
// }
//
// export default User;
