import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './src/module_5/const';
import { Path } from './src/module_6/consts';
import { auth, errorHandler, logger } from './src/module_6/middlewares';
import { cartRouter, productsRouter } from './src/module_6/router';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import User from './src/module_7/entities/user';
import Product from './src/module_7/entities/product';
import Cart from './src/module_7/entities/cart';
import Order from './src/module_7/entities/order';
import config from './mikro-orm.config';

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    user: EntityRepository<User>,
    product: EntityRepository<Product>,
    cart: EntityRepository<Cart>,
    order: EntityRepository<Order>,
};
const app = express();
const startApp = async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
    DI.em = DI.orm.em;
    DI.user = DI.orm.em.getRepository(User);
    DI.product = DI.orm.em.getRepository(Product);
    DI.cart = DI.orm.em.getRepository(Cart);
    DI.order = DI.orm.em.getRepository(Order);

    app.use(express.json())
    app.use(bodyParser.json())
    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next);
    });

    app.use(Path.cart, auth, cartRouter);
    app.use(Path.products, auth, productsRouter);

    app.use(errorHandler);
    app.use(logger);

    app.listen(PORT, () => {
        console.log('Server is started');
    })
}

startApp().catch((error) => {
    console.error(error);
});
