import { getUser } from '../repositories/users';

const fetchUser = async (userId: string) => await getUser(userId);

export { fetchUser }
