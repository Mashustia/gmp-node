import { CartsEntity } from '../dataBase/carts'
import {
    fetchCartAndTotalPrice,
    getOrderData,
} from '../utils';
import { ProductEntity } from '../dataBase/products';
import { orm } from '../app';
import Cart from '../../module_7/entities/cart';
import User from '../../module_7/entities/user';
import { getProductsList } from './product';
import Order from '../../module_7/entities/order';

export interface Product {
    productId: string
    count: number
}

export interface CartTemplate {
    cart: Pick<CartsEntity, 'id' | 'items'>
    total: number
}

const getActiveCart = async (userId: string): Promise<Cart | null> => {
    const user = await orm.em.findOneOrFail(User, userId);
    const cart = await orm.em.findOne(Cart, { user, isDeleted: false });

    return cart;
}

export const createCart = async (userId: string): Promise<Cart> => {
    const user = await orm.em.findOneOrFail(User, userId);
    const newCart = new Cart(user);
    await orm.em.persistAndFlush(newCart);

    return newCart;
};

const getUserCart = async (userId: string): Promise<CartTemplate> => {
    const activeCart = await getActiveCart(userId);

    if (activeCart) {
        return fetchCartAndTotalPrice(activeCart);
    }
    const newCart = await createCart(userId);
    return {
        cart: newCart,
        total: 0
    }
}

const updateUserCart = async (userId: string, product: Product): Promise<CartTemplate | null> => {
    const activeCart = await getActiveCart(userId);

    if (activeCart) {
        const productIndex = activeCart.items.findIndex((item) => item.product.id === product.productId)
        const productIsInCart = productIndex !== -1;
        const needToDeleteProduct = product.count === 0;
        if (productIsInCart && needToDeleteProduct) {
            activeCart.items = activeCart.items.filter((item) => item.product.id !== product.productId);
            await orm.em.persistAndFlush(activeCart);

            return fetchCartAndTotalPrice(activeCart);
        }

        if (productIsInCart) {
            const updatedProduct = activeCart.items[productIndex];
            updatedProduct.count = product.count;
            activeCart.items = activeCart.items.splice(productIndex, 1, updatedProduct);

            await orm.em.persistAndFlush(activeCart);

            return fetchCartAndTotalPrice(activeCart);
        }

        const products = await getProductsList();
        const productFullData: ProductEntity | undefined = products.find((item) => item.id === product.productId);
        if (productFullData) {
            activeCart.items.push({
                product: productFullData,
                count: product.count
            });
            await orm.em.persistAndFlush(activeCart);

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
        await orm.em.persistAndFlush(activeCart);

        return true;
    }
    return false;
}

const createOrder = async (userId: string): Promise<Order | null> => {
    const user = await orm.em.findOneOrFail(User, userId);
    const activeCart = await getActiveCart(userId);
    if (activeCart) {
        const orderData = getOrderData(user, activeCart);
        const newOrder = orm.em.create(Order, orderData);
        await orm.em.persistAndFlush(newOrder);

        return newOrder;
    }
    return null;
}

export { getUserCart, updateUserCart, emptyUserCart, createOrder }
