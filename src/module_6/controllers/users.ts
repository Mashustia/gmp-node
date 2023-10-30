import { fetchUser } from '../services/users';

const fetchUserController = (userId: string) => fetchUser(userId)

export { fetchUserController };
