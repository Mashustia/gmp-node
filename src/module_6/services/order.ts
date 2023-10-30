import { createOrder } from '../repositories/order';
import { Schema } from 'mongoose';

const checkoutCart = async (userId: Schema.Types.ObjectId) => createOrder(userId);

export { checkoutCart }
