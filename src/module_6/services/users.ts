import { fetchUser } from '../controllers/users';

const fetchUserController = async (userId: string) => await fetchUser(userId);

export { fetchUserController }
