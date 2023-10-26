import { DI } from '../../../app';
import User from '../../module_7/entities/user';

const getUser = async (userId: string): Promise<User | null> => {
    const user = await DI.user.findOne(userId);
    if (user) {
        return user
    }
    return null;
}

export { getUser }
