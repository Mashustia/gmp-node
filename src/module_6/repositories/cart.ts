import carts, { CartsEntity } from '../dataBase/carts'
import {
    createNewCart, fetchCartAndTotalPrice,
    getOrderData,
    getUserCartAndActiveCartId,
} from '../utils';
import products, { ProductEntity } from '../dataBase/products';
import { OrderEntity, orders } from '../dataBase/orders';

export interface Product {
    productId: string
    count: number
}

export interface CartTemplate {
    cart: Pick<CartsEntity, 'id' | 'items'>
    total: number
}

const getUserCart = (userId: string): CartTemplate => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        return fetchCartAndTotalPrice(userCarts[activeCartId]);
    }
    return {
        cart: createNewCart(),
        total: 0
    }
}

const updateUserCart = (userId: string, product: Product): CartTemplate | null => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const activeCart = userCarts[activeCartId];
        const productIndex = activeCart.items.findIndex((item) => item.product.id === product.productId)
        const productIsInCart = productIndex !== -1;
        const needToDeleteProduct = product.count === 0;
        if (productIsInCart && needToDeleteProduct) {
            activeCart.items = activeCart.items.filter((item) => item.product.id !== product.productId);
            userCarts[activeCartId] = activeCart;

            return fetchCartAndTotalPrice(userCarts[activeCartId]);
        }

        if (productIsInCart) {
            const updatedProduct = activeCart.items[productIndex];
            updatedProduct.count = product.count;
            activeCart.items = activeCart.items.splice(productIndex, 1, updatedProduct);
            userCarts[activeCartId] = activeCart;

            return fetchCartAndTotalPrice(userCarts[activeCartId]);
        }

        const productFullData: ProductEntity | undefined = products.find((item) => item.id === product.productId);
        if (productFullData) {
            activeCart.items.push({
                product: productFullData,
                count: product.count
            });
            userCarts[activeCartId] = activeCart;
            return fetchCartAndTotalPrice(activeCart);
        }

        return null;
    }
    return null;
}

const emptyUserCart = (userId: string): boolean => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const activeCart = userCarts[activeCartId];
        activeCart.items = [];
        userCarts[activeCartId] = activeCart;

        return true;
    }
    return false;
}

const createOrder = (userId: string): OrderEntity | null => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const cart = userCarts[activeCartId];
        const order = getOrderData(userId, cart);
        orders.push(order);
        return order;
    }
    return null;
}

export { getUserCart, updateUserCart, emptyUserCart, createOrder }
