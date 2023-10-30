import { createOrder } from '../repositories/order';

const checkoutCart = async (userId: string) => createOrder(userId);

export { checkoutCart }
