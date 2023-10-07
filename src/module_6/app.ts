import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../module_5/const';
import { Path } from './consts';
import { auth, errorHandler, logger } from './middlewares';
import { cartRouter, productsRouter } from './router';

const app = express();

app.listen(PORT, () => {
    console.log('Server is started');
})

app.use(express.json())
app.use(bodyParser.json())

app.use(Path.cart, auth, cartRouter);
app.use(Path.products, auth, productsRouter);

app.use(errorHandler);
app.use(logger);
