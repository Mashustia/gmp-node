import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import User from './entities/user';
import Order from './entities/order';
import Cart from './entities/cart';
import Product from './entities/product';

const config: Options<PostgreSqlDriver> = {
    entities: [User, Order, Cart, Product], // no need for `entitiesTs` this way
    dbName: 'my-db-name',
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`,
    migrations: {
        path: '../../dist/module_7/migrations',
        pathTs: '../../src/module_7/migrations',
    },
};

export default config;
