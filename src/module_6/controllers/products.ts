import { Request, Response } from 'express';
import { getErrorMessage, getSuccessMessage, getXUserHeader } from '../utils';
import { getProduct, getProducts } from '../services/products';
import { StatusCode } from '../../module_5/const';
import { isNil } from 'lodash-es';
import { errorMessage } from '../consts';

const getProductsController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    if (userId) {
        const products = getProducts();

        return getSuccessMessage({
            res,
            statusCode: StatusCode.OK,
            data: products
        });
    }
}

const getProductController = async (req: Request, res: Response) => {
    const userId = getXUserHeader(req);
    const productId = req.params.productId;
    if (userId && productId) {
        const product = getProduct(productId);

        if (!isNil(productId)) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: product
            });
        }

        return getErrorMessage({
            res,
            statusCode: StatusCode.NOT_FOUND,
            message: errorMessage.no_product_found
        })
    }
}

export { getProductsController, getProductController }
