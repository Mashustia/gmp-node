import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import User from './entities/user';
import Order from './entities/order';
import Cart from './entities/cart';
import Product from './entities/product';

const config: Options<PostgreSqlDriver> = {
    entities: [User, Order, Cart, Product], // no need for `entitiesTs` this way
    dbName: 'my-db-name',
    // entities: ["./dist/entities"], // path to your JS entities (dist), relative to `baseDir`
    // entitiesTs: [Product, User, Cart, Order], // path to our TS entities (src), relative to `baseDir`
    // migrations: {
    //     path: "./dist/migrations", // path to the folder with migrations
    //     pathTs: "./src/migrations", // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    // },
    type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
};

export default config;
