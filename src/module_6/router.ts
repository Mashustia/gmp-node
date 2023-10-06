import express from 'express';

import { Route } from './consts';
export const cartRouter = express.Router();
export const productsRouter = express.Router();
export const authRouter = express.Router();

// hypothetical routes

// /api/profile/cart
// /api/profile/cart/checkout
cartRouter.get(Route.default, () => {});
cartRouter.put(Route.default, () => {});
cartRouter.delete(Route.default, () => {});
cartRouter.post(Route.checkout, () => {});

// /api/products
// /api/products/:productId
productsRouter.get(Route.default, () => {});
productsRouter.get(Route.product, () => {});

// /api/auth/register
// /api/auth/login
productsRouter.post(Route.register, () => {});
productsRouter.post(Route.login, () => {});

