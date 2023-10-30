import { Schema } from 'mongoose';

import { emptyUserCart, getUserCart, updateUserCart } from '../repositories/cart';
import { ProductData } from '../../module_7/entities/types';

const getCart = async (userId: Schema.Types.ObjectId) => getUserCart(userId);
const updateCart = async (userId: Schema.Types.ObjectId, product: ProductData) => updateUserCart(userId, product);
const clearCart = async (userId: Schema.Types.ObjectId) => emptyUserCart(userId);


export { getCart, updateCart, clearCart }
