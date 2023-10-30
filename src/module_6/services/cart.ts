import { emptyUserCart, getUserCart, updateUserCart } from '../repositories/cart';
import { ProductData } from '../../module_7/entities/types';

const getCart = async (userId: string) => getUserCart(userId);
const updateCart = async (userId: string, product: ProductData) => updateUserCart(userId, product);
const clearCart = async (userId: string) => emptyUserCart(userId);


export { getCart, updateCart, clearCart }
