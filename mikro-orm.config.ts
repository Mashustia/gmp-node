import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import Cart from './src/module_7/entities/cart';
import Order from './src/module_7/entities/order';
import Product from './src/module_7/entities/product';
import User from './src/module_7/entities/user';

const config: Options<PostgreSqlDriver> = {
    entities: [User, Cart, Order, Product],
    dbName: 'node_gmp',
    user: 'node_gmp',
    password: 'password123',
    host: 'localhost',
    type: 'postgresql',
    migrations: {
        path: '../../dist/module_7/migrations',
        pathTs: '../../src/module_7/migrations',
    },
    seeder: {
        path: '../../dist/module_7/seeders',
        pathTs: '../../src/module_7/seeders',
    },
};

export default config;
