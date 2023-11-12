import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { Path, PORT, Route, URI } from './src/consts';
import { verifyToken, errorHandler, incomingRequestLogger } from './src/middlewares';
import { authRouter, cartRouter, healthCheck, productsRouter, registrationRouter } from './src/router';
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
    app.use(incomingRequestLogger);

    app.use(Route.health, healthCheck);
    app.use(Path.registration, registrationRouter);
    app.use(Path.auth, authRouter);
    app.use(Route.api, verifyToken);

    app.use(Path.cart, cartRouter);
    app.use(Path.products, productsRouter);

    app.use(errorHandler);

    await mongoose.connect(URI).then(() => console.log('connected to mongodb!'))

    app.listen(PORT, () => {
        console.log('Server is started');
    })
}

startApp().catch((error) => {
    console.error(error);
});
