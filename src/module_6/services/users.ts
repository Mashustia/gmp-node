import { Schema } from 'mongoose';

import { getUser } from '../repositories/users';

const fetchUser = async (userId: Schema.Types.ObjectId) => await getUser(userId);

export { fetchUser }
