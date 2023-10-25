import { CartsEntity } from '../dataBase/carts'
import {
    fetchCartAndTotalPrice,
    getOrderData,
} from '../utils';
import { ProductEntity } from '../dataBase/products';
import { DI } from '../app';
import Cart from '../../module_7/entities/cart';
import { getProductsList } from './product';
import Order from '../../module_7/entities/order';
import { getUser } from './users';

export interface Product {
    productId: string
    count: number
}

export interface CartTemplate {
    cart: Pick<CartsEntity, 'id' | 'items'>
    total: number
}

const getActiveCart = async (userId: string): Promise<Cart | null> => {
    const user = await getUser(userId);
    const cart = await DI.cart.findOne({ user, isDeleted: false });

    return cart;
}

export const createCart = async (userId: string): Promise<Cart | null> => {
    const user = await getUser(userId);
    if (user) {
        const newCart = new Cart(user);
        await DI.em.persistAndFlush(newCart);

        return newCart;
    }
    return null;
};

const getUserCart = async (userId: string): Promise<CartTemplate | null> => {
    const activeCart = await getActiveCart(userId);

    if (activeCart) {
        return fetchCartAndTotalPrice(activeCart);
    }

    const newCart = await createCart(userId);
    if (newCart) {
        return {
            cart: newCart,
            total: 0
        }
    }
    return null;
}

const updateUserCart = async (userId: string, product: Product): Promise<CartTemplate | null> => {
    const activeCart = await getActiveCart(userId);

    if (activeCart) {
        const productIndex = activeCart.items.findIndex((item) => item.product.id === product.productId)
        const productIsInCart = productIndex !== -1;
        const needToDeleteProduct = product.count === 0;
        if (productIsInCart && needToDeleteProduct) {
            activeCart.items = activeCart.items.filter((item) => item.product.id !== product.productId);
            await DI.em.persistAndFlush(activeCart);

            return fetchCartAndTotalPrice(activeCart);
        }

        if (productIsInCart) {
            const updatedProduct = activeCart.items[productIndex];
            updatedProduct.count = product.count;
            activeCart.items = activeCart.items.splice(productIndex, 1, updatedProduct);

            await DI.em.persistAndFlush(activeCart);

            return fetchCartAndTotalPrice(activeCart);
        }

        const products = await getProductsList();
        const productFullData: ProductEntity | undefined = products.find((item) => item.id === product.productId);
        if (productFullData) {
            activeCart.items.push({
                product: productFullData,
                count: product.count
            });
            await DI.em.persistAndFlush(activeCart);

            return fetchCartAndTotalPrice(activeCart);
        }

        return null;
    }
    return null;
}

const emptyUserCart = async (userId: string): Promise<boolean> => {
    const activeCart = await getActiveCart(userId);
    if (activeCart) {
        activeCart.items = [];
        await DI.em.persistAndFlush(activeCart);

        return true;
    }
    return false;
}

const createOrder = async (userId: string): Promise<Order | null> => {
    const user = await getUser(userId);
    const activeCart = await getActiveCart(userId);
    if (activeCart && user) {
        const orderData = getOrderData(user, activeCart);
        const newOrder = DI.em.create(Order, orderData);
        await DI.em.persistAndFlush(newOrder);

        return newOrder;
    }
    return null;
}

export { getUserCart, updateUserCart, emptyUserCart, createOrder }
