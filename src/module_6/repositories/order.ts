import { Schema } from 'mongoose';

import { getUser } from './users';
import { getOrderData } from '../utils';
import { getActiveCart } from './cart';
import Order from '../../module_7/entities/order';
import { OrderModel } from '../../module_7/entities/types';

const createOrder = async (userId: Schema.Types.ObjectId): Promise<OrderModel | null> => {
    const user = await getUser(userId);
    const activeCart = await getActiveCart(userId);
    if (activeCart && user) {
        const orderData = getOrderData(user, activeCart);
        const newOrder = new Order(orderData)

        return await newOrder.save()
            .then(savedOrder => savedOrder)
            .catch(err => null)
    }
    return null;
}

export { createOrder }
