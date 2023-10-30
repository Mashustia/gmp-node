import { UserModel } from '../../module_7/entities/types';
import User from '../../module_7/entities/user';

const getUser = async (userId: string): Promise<UserModel | null> => {
    return await User.findOne({ _id: userId }).exec();
}

export { getUser }
