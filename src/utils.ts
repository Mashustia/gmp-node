import { Response } from 'express';

import { CartItemModel, CartModelAndMethods, CartTemplate, UserModel } from './entities/types';
import { logger } from './logs/logger';

export const getTotalPrice = (items: CartItemModel[]): number => items
    .reduce((partialSum, { product, count }) => partialSum + product.price * count, 0)

export const getOrderData = (user: UserModel, { _id, items }: CartModelAndMethods) => ({
    userId: user.id,
    cartId: _id,
    items: items,
    payment: {
        type: 'paypal',
        address: undefined,
        creditCard: undefined
    },
    delivery: {
        type: 'post',
        address: 'some address'
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

export const fetchCartItemsUserIdExcluded = ({ _id, items }: CartModelAndMethods) => ({
    id: _id,
    items
});

export const fetchCartAndTotalPrice = (cart: CartModelAndMethods): CartTemplate => ({
    cart: fetchCartItemsUserIdExcluded(cart),
    total: getTotalPrice(cart.items)
});

export const loggerCall = (componentName: string, errorMessage: string) => logger
    .error(`Error in ${componentName}: ${errorMessage}`);
