import { getUser } from '../repositories/users';

const fetchUser = (userId: string) => getUser(userId)

export { fetchUser };
