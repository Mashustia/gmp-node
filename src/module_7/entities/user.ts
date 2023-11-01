import { Schema, model } from 'mongoose';

import { Role, UserModel } from './types';

const UserSchema = new Schema<UserModel>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [Role.user, Role.admin]
    }
});

const User = model<UserModel>('User', UserSchema);

export default User;
