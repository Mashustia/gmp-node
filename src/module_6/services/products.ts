import { Schema } from 'mongoose';

import { getProductById, getProductsList } from '../repositories/product';

const getProducts = async () => getProductsList();
const getProduct = async (productId: Schema.Types.ObjectId) => getProductById(productId);

export { getProducts, getProduct }
