import { Request, Response } from 'express';
import { pick } from 'lodash-es';
import {
    CartItemEntity,
} from './dataBase/carts';
import Cart from '../module_7/entities/cart';
import { UserModel } from '../module_7/entities/types';
export const getTotalPrice = (items: CartItemEntity[]): number => items
    .reduce((partialSum, { product, count }) => partialSum + product.price * count, 0)

export const getOrderData = (user: UserModel, { id, items }: Cart) => ({
    user,
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

export const fetchCartItemsUserIdExcluded = (cart: Cart) => pick(cart, ['id', 'items']);

export const fetchCartAndTotalPrice = (cart: Cart) => ({
    cart: fetchCartItemsUserIdExcluded(cart),
    total: getTotalPrice(cart.items)
});
