import { getUser } from './users';
import { getOrderData } from '../utils';
import { getActiveCart } from './cart';
import Order from '../entities/order';
import { OrderModel } from '../entities/types';

const createOrder = async (userId: string): Promise<OrderModel | null> => {
    const user = await getUser(userId);
    const activeCart = await getActiveCart(userId);
    if (activeCart && user) {
        const orderData = getOrderData(user, activeCart);
        const newOrder = new Order(orderData)

        return await newOrder.save()
            .then(savedOrder => {
                return savedOrder;
            })
            .catch(error => {
                console.log(error);
                return null;
            })
    }
    return null;
}

export { createOrder }
