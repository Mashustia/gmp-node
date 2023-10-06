import { createOrder, emptyUserCart, getUserCart, Product, updateUserCart } from '../repositories/cart';

const getCart = async (userId: string) => getUserCart(userId);
const updateCart = async (userId: string, product: Product) => updateUserCart(userId, product);
const clearCart = async (userId: string) => emptyUserCart(userId);
const makeOrder = async (userId: string) => createOrder(userId);

export { getCart, updateCart, clearCart, makeOrder }
