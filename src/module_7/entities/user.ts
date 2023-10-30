import { Schema, model } from 'mongoose';

import { UserModel } from './types';

const UserSchema = new Schema<UserModel>({
    email: {
        type: String,
        required: true,
    },
});

const User = model<UserModel>('User', UserSchema);

export default User;
