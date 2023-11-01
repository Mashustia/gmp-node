import express from 'express';

import { Route } from './consts';
import {
    checkoutCartController,
    clearCartController,
    getCartController,
    updateCartController
} from './controllers/cart';
import { getProductController, getProductsController } from './controllers/products';
import loginController from './controllers/login';
import registrationController from './controllers/registration';

export const cartRouter = express.Router();
export const productsRouter = express.Router();
export const authRouter = express.Router();
export const registrationRouter = express.Router();

// hypothetical routes

// /api/profile/cart
// /api/profile/cart/checkout
cartRouter.get(Route.default, getCartController);
cartRouter.put(Route.default, updateCartController);
cartRouter.delete(Route.default, clearCartController);
cartRouter.post(Route.checkout, checkoutCartController);

// /api/products
// /api/products/:productId
productsRouter.get(Route.default, getProductsController);
productsRouter.get(Route.product, getProductController);

// /api/login
authRouter.get(Route.default, loginController);

// /api/register
registrationRouter.get(Route.default, registrationController);

