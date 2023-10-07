import { Request, Response } from 'express';
import { getErrorMessage, getSuccessMessage, getXUserHeader } from '../utils';
import { StatusCode } from '../../module_5/const';
import { clearCart, getCart, checkoutCart, updateCart } from '../services/cart';
import { isNil } from 'lodash-es';
import { errorMessage } from '../consts';

const getCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    if (userId) {
        const cart = await getCart(userId);

        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: {
                cart
            }
        });
    }
}

const updateCartController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    const cart = req.body;

    if (userId) {
        const updatedCart = await updateCart(userId, cart);

        if (!isNil(updatedCart)) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: {
                    cart
                }
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
        const order = checkoutCart(userId);

        if (!isNil(order)) {
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
