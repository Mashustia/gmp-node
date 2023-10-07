import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../module_5/const';
import { Path } from './consts';
import { auth, errorHandler, logger } from './middlewares';
import { authRouter, cartRouter, productsRouter } from './router';

const app = express();

app.listen(PORT, () => {
    console.log('Server is started');
})

app.use(express.json())
app.use(bodyParser.json())

app.use(Path.cart, cartRouter);
app.use(Path.products, productsRouter);
app.use(Path.auth, authRouter);

app.use(app, errorHandler);
app.use(app, logger);
app.use(app, auth);

