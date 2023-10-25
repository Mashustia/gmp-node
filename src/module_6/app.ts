import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../module_5/const';
import { Path } from './consts';
import { auth, errorHandler, logger } from './middlewares';
import { cartRouter, productsRouter } from './router';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from '../module_7/mikro-orm.config';
import User from '../module_7/entities/user';
import Product from '../module_7/entities/product';
import Cart from '../module_7/entities/cart';
import Order from '../module_7/entities/order';

export const DI = {} as {
    orm: MikroORM,
    em: EntityManager,
    user: EntityRepository<User>,
    product: EntityRepository<Product>,
    cart: EntityRepository<Cart>,
    order: EntityRepository<Order>,
};

const app = express();

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
