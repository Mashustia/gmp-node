import { Request, Response } from 'express';
import { getErrorMessage, getSuccessMessage, getXUserHeader } from '../utils';
import { StatusCode } from '../../module_5/const';
import { clearCart, getCart, updateCart } from '../services/cart';
import { errorMessage } from '../consts';
import { checkoutCart } from '../services/order';

const getCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    if (userId) {
        const cart = await getCart(userId);

        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: cart
        });
    }
}

const updateCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    const cart = req.body;

    if (userId) {
        const updatedCart = await updateCart(userId, cart);

        if (updatedCart !== null) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: updatedCart
            });
        }
    }

    return getErrorMessage({
        res,
        statusCode: StatusCode.NOT_FOUND,
        message: errorMessage.cart_not_found
    })
}

const clearCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);

    if (userId) {
        const isCartCleared = await clearCart(userId)

        if (isCartCleared) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: {
                    success: true
                }
            });
        }

        return getErrorMessage({
            res,
            statusCode: StatusCode.NOT_FOUND,
            message: errorMessage.cart_not_found
        })
    }
}

const checkoutCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);

    if (userId) {
        const order = await checkoutCart(userId);

        if (order !== null) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: {
                    order
                }
            });
        }

        return getErrorMessage({
            res,
            statusCode: StatusCode.NOT_FOUND,
            message: errorMessage.cart_not_found
        })
    }
}

export { getCartController, updateCartController, clearCartController, checkoutCartController }
