import express from 'express';

import { Route } from './consts';
import {
    checkoutCartController,
    deleteCartController,
    getCartController,
    updateCartController
} from './controllers/cart';
import { getProductController, getProductsController } from './controllers/products';
import loginController from './controllers/login';
import registrationController from './controllers/registration';
import { isAdminCheck } from './middlewares';
import healthController from './controllers/healthController';

export const cartRouter = express.Router();
export const productsRouter = express.Router();
export const authRouter = express.Router();
export const registrationRouter = express.Router();
export const healthCheck = express.Router();


// hypothetical routes

// /api/profile/cart
// /api/profile/cart/checkout
cartRouter.get(Route.default, getCartController);
cartRouter.put(Route.default, updateCartController);
cartRouter.delete(Route.default, isAdminCheck, deleteCartController);
cartRouter.post(Route.checkout, checkoutCartController);

// /api/products
// /api/products/:productId
productsRouter.get(Route.default, getProductsController);
productsRouter.get(Route.product, getProductController);

// /api/login
authRouter.post(Route.default, loginController);

// /api/register
registrationRouter.post(Route.default, registrationController);

// /health
healthCheck.get(Route.default, healthController);

