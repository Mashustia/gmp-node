import { Request, Response } from 'express';
import { findKey, pick } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import {
    CartItemEntity,
    Carts,
    CartsEntity,
    DeletedAndActiveCarts,
} from './dataBase/carts';
import { OrderEntity } from './dataBase/orders';

export const createNewCart = (): Omit<CartsEntity, 'userId'> => ({
    id: uuidv4(),
    isDeleted: false,
    items: []
})

export const getUserCartAndActiveCartId = (
    { carts, userId }: { carts: Carts, userId: string }
): { userCarts: DeletedAndActiveCarts, activeCartId: string | undefined } => {
    const userCarts = carts[userId];
    const activeCartId = findKey(userCarts, ['isDeleted', false]);
    return { userCarts, activeCartId }
}

export const modifyUserCart = (cart: CartsEntity): Omit<CartsEntity, 'userId'> => pick(cart, ['id', 'isDeleted', 'items']);

export const getTotalPrice = (items: CartItemEntity[]): number => items
    .reduce((partialSum, { product, count }) => partialSum + product.price * count, 0)

export const getOrderData = (userId: string, { id, items }: Omit<CartsEntity, 'userId'>): OrderEntity => ({
    id: uuidv4(),
    userId,
    cartId: id,
    items: items,
    payment: {
        type: 'paypal',
        address: undefined,
        creditCard: undefined
    },
    delivery: {
        type: 'post',
        address: undefined
    },
    comments: '',
    status: 'created',
    total: getTotalPrice(items)
})

export const getErrorMessage = (
    { res, statusCode, message }: { res: Response, statusCode: number, message: string }
) => res.status(statusCode).json({
    error: {
        message,
    },
});

export const getSuccessMessage = <T>(
    { res, statusCode, data }: { res: Response, statusCode: number, data: T }
) => res.status(statusCode).json({
    data,
    error: null
});

export const getXUserHeader = (req: Request) => req.header('x-user-id');
