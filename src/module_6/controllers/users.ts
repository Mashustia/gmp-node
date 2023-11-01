import { addUser, fetchUserByEmail } from '../services/users';
import { NewUser } from '../../module_7/entities/types';

const findUserByEmail = (email: string) => fetchUserByEmail(email)
const createUser = (newUserData: NewUser) => addUser(newUserData)

export { findUserByEmail, createUser };
