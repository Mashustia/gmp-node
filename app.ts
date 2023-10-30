import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { PORT } from './src/module_5/const';
import { Path } from './src/module_6/consts';
import { auth, errorHandler, logger } from './src/module_6/middlewares';
import { cartRouter, productsRouter } from './src/module_6/router';

const app = express();
const startApp = async () => {

    app.use(express.json())
    app.use(bodyParser.json())

    app.use(Path.cart, auth, cartRouter);
    app.use(Path.products, auth, productsRouter);

    app.use(errorHandler);
    app.use(logger);

    await mongoose.connect('mongodb://127.0.0.1:27017/node-gmp-db-mongo').then(() => console.log('connected to mongodb!'))

    app.listen(PORT, () => {
        console.log('Server is started');
    })
}

startApp().catch((error) => {
    console.error(error);
});
