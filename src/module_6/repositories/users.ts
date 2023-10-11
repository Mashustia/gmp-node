import { users, UsersEntity } from '../dataBase/users';

const getUser = (userId: string): UsersEntity | null => {
    const user = users.find((item) => item.id === userId);
    if (user) {
        return user
    }
    return null;
}

export { getUser }
