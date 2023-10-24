import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../module_5/const';
import { Path } from './consts';
import { auth, errorHandler, logger } from './middlewares';
import { cartRouter, productsRouter } from './router';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from '../module_7/mikro-orm.config';

export const DI = {};
const app = express();
export const orm = await MikroORM.init<PostgreSqlDriver>(config);

app.use(express.json())
app.use(bodyParser.json())
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});

app.use(Path.cart, auth, cartRouter);
app.use(Path.products, auth, productsRouter);

app.use(errorHandler);
app.use(logger);

app.listen(PORT, () => {
    console.log('Server is started');
})
