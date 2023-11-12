import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as net from 'net';

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

    const server = app.listen(PORT, () => {
        console.log('Server is started');
    })

    // Graceful shutdown
    let connections: net.Socket[] = [];
    server.on('connection', (connection) => {
        connections.push(connection);

        connection.on('close', () => {
            connections = connections.filter((currentConnection) => currentConnection !== connection);
        });
    });

    const shutdown = () => {
        console.log('Received kill signal, shutting down gracefully');

        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 20000);

        connections.forEach((connection) => connection.end());

        setTimeout(() => {
            connections.forEach((connection) => connection.destroy());
        }, 10000);
    }

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

startApp().catch((error) => {
    console.error(error);
});
