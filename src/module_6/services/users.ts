import { createUser, getUserByEmail } from '../repositories/users';
import { NewUser } from '../../module_7/entities/types';

const fetchUserByEmail = async (email: string) => await getUserByEmail(email);
const addUser = async (newUserData: NewUser) => await createUser(newUserData);

export { fetchUserByEmail, addUser }
