import { Request, Response } from 'express';
import { getErrorMessage, getSuccessMessage, loggerCall } from '../utils';
import { getProduct, getProducts } from '../services/products';
import { errorMessage, StatusCode } from '../consts';

const getProductsController = async (req: Request, res: Response) => {
    const products = await getProducts();

    return getSuccessMessage({
        res,
        statusCode: StatusCode.OK,
        data: products
    });
}

const getProductController = async (req: Request, res: Response) => {
    const productId = req.params.productId;

    if (!productId) {
        loggerCall('getProductController', errorMessage.products_not_valid);
        getErrorMessage({
            res,
            statusCode: StatusCode.BAD_REQUEST,
            message: errorMessage.products_not_valid
        })
    }

    const product = await getProduct(productId);
    if (product !== null) {
        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: product
        });
    }

    loggerCall('getProductController', errorMessage.no_product_found);
    return getErrorMessage({
        res,
        statusCode: StatusCode.NOT_FOUND,
        message: errorMessage.no_product_found
    })
}

export { getProductsController, getProductController }
