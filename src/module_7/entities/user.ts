import { Schema, model } from 'mongoose';

import { CartSchema } from './cart';
import { OrderSchema } from './order';
import { UserModel } from './types';

const UserSchema = new Schema<UserModel>({
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

const User = model<UserModel>('User', UserSchema);

export default User;
