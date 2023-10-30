import { Schema } from 'mongoose';

import { fetchUser } from '../services/users';

const fetchUserController = (userId: Schema.Types.ObjectId) => fetchUser(userId)

export { fetchUserController };
