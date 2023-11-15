import { deleteUserCart, getUserCart, updateUserCart } from '../repositories/cart';
import { ProductData } from '../entities/types';

const getCart = async (userId: string) => getUserCart(userId);
const updateCart = async (userId: string, product: ProductData) => updateUserCart(userId, product);
const deleteCart = async (userId: string) => deleteUserCart(userId);


export { getCart, updateCart, deleteCart }
