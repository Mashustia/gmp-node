import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { Path, PORT, Route } from './src/consts';
import { verifyToken, errorHandler, logger } from './src/middlewares';
import { authRouter, cartRouter, productsRouter, registrationRouter } from './src/router';
import { CurrentUser } from './src/entities/types';

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser
        }
    }
}

const app = express();
const startApp = async () => {
    app.use(express.json())
    app.use(bodyParser.json())

    app.use(Path.registration, registrationRouter);
    app.use(Path.auth, authRouter);
    app.use(Route.api, verifyToken);

    app.use(Path.cart, cartRouter);
    app.use(Path.products, productsRouter);

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
