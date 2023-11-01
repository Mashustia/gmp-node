import { NewUser, UserModel } from '../../module_7/entities/types';
import User from '../../module_7/entities/user';

const getUser = async (userId: string): Promise<UserModel | null> => {
    return await User.findOne({ _id: userId }).exec();
}
const getUserByEmail = async (email: string): Promise<UserModel | null> => {
    const user = await User.findOne({ email: email }).exec();


    return user ??  null;
}

const createUser = async (user: NewUser): Promise<string | null> => {
    return await User.create(user)
        .then(savedUser => {
            return savedUser._id.toString();
        })
        .catch(err => null)
}

export { getUser, getUserByEmail, createUser }
