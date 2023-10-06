import { pick } from 'lodash-es';
import carts, { CartsEntity } from '../dataBase/carts'
import { createNewCart, getOrderData, getTotalPrice, getUserCartAndActiveCartId, modifyUserCart } from '../utils';
import { errorMessage } from '../consts';

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
        const cart = pick(userCarts[activeCartId], ['id', 'isDeleted', 'items']);
        return {
            cart,
            total: getTotalPrice(cart.items)
        }
    }
    return {
        cart: createNewCart(),
        total: 0
    }
}

const updateUserCart = (userId: string, product: Product): Omit<CartsEntity, 'userId'> => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const activeCart = userCarts[activeCartId];
        const productIndex = activeCart.items.findIndex((item) => item.product.id === product.productId)
        const productIsInCart = productIndex !== -1;
        const needToDeleteProduct = product.count === 0;
        if (productIsInCart && needToDeleteProduct) {
            activeCart.items = activeCart.items.filter((item) => item.product.id !== product.productId);
            return modifyUserCart(activeCart)
        }

        if (productIsInCart) {
            activeCart.items = activeCart.items.splice(productIndex, 1, {
                ...activeCart.items[productIndex],
                count: product.count
            });
            return modifyUserCart(activeCart)
        }

        return modifyUserCart(activeCart)
    }
    throw new Error(errorMessage.cart_not_found);
}

const emptyUserCart = (userId: string) => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const activeCart = userCarts[activeCartId];
        activeCart.items = [];

        return {
            success: true
        }
    }
    throw new Error(errorMessage.cart_not_found);
}

const createOrder = (userId: string) => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        const cart = userCarts[activeCartId];
        const order = getOrderData(userId, cart);
        return {
            order
        }
    }
    throw new Error(errorMessage.cart_not_found);
}

export { getUserCart, updateUserCart, emptyUserCart, createOrder }
