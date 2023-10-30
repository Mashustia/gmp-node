import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { CartItemModel, CartModelAndMethods, CartTemplate, UserModel } from '../module_7/entities/types';
export const getTotalPrice = (items: CartItemModel[]): number => items
    .reduce((partialSum, { product, count }) => partialSum + product.price * count, 0)

export const getOrderData = (user: UserModel, { _id, items }: CartModelAndMethods) => ({
    user,
    cartId: _id,
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

export const getXUserHeader = (req: Request) => new mongoose.Types.ObjectId(req.header('x-user-id'));

export const fetchCartItemsUserIdExcluded = ({ _id, items }: CartModelAndMethods) => ({
    id: _id,
    items
});

export const    fetchCartAndTotalPrice = (cart: CartModelAndMethods): CartTemplate => ({
    cart: fetchCartItemsUserIdExcluded(cart),
    total: getTotalPrice(cart.items)
});
