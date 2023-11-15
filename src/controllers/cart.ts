import { Request, Response } from 'express';
import { getErrorMessage, getSuccessMessage, loggerCall } from '../utils';
import { deleteCart, getCart, updateCart } from '../services/cart';
import { errorMessage, StatusCode } from '../consts';
import { checkoutCart } from '../services/order';
import { Role } from '../entities/types';

const getCartController = async (req: Request, res: Response) => {
    const cart = await getCart(req.user.id);

    return getSuccessMessage({
        res,
        statusCode: StatusCode.OK,
        data: cart
    });
}

const updateCartController = async (req: Request, res: Response) => {
    const cart = req.body;

    const updatedCart = await updateCart(req.user.id, cart);

    if (updatedCart !== null) {
        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: updatedCart
        });
    }

    loggerCall('updateCartController', errorMessage.cart_not_found);
    return getErrorMessage({
        res,
        statusCode: StatusCode.NOT_FOUND,
        message: errorMessage.cart_not_found
    })
}

const deleteCartController = async (req: Request, res: Response) => {
    try {
        const isAdmin = req.user.role === Role.admin;

        if (!isAdmin) {
            loggerCall('deleteCartController', errorMessage.not_admin);
            return getErrorMessage({
                res,
                statusCode: StatusCode.FORBIDDEN,
                message: errorMessage.not_admin
            })
        }

        const isCartDeleted = await deleteCart(req.user.id)
        if (isCartDeleted) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: {
                    success: true
                }
            });
        }

        loggerCall('deleteCartController', errorMessage.cart_not_found);
        return getErrorMessage({
            res,
            statusCode: StatusCode.NOT_FOUND,
            message: errorMessage.cart_not_found
        })
    } catch (err) {
        loggerCall('deleteCartController', errorMessage.internal_server_error);
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.internal_server_error
        })
    }
}

const checkoutCartController = async (req: Request, res: Response) => {
    const order = await checkoutCart(req.user.id);

    if (order !== null) {
        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: {
                order
            }
        });
    }

    loggerCall('checkoutCartController', errorMessage.cart_not_found);
    return getErrorMessage({
        res,
        statusCode: StatusCode.NOT_FOUND,
        message: errorMessage.cart_not_found
    })
}

export { getCartController, updateCartController, deleteCartController, checkoutCartController }
