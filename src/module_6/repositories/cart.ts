import { pick } from 'lodash-es';
import carts, { CartsEntity } from '../dataBase/carts.entity'
import { createNewCart, getOrderData, getUserCartAndActiveCartId, modifyUserCart } from '../utils';

interface Product {
    productId: string
    count: number
}

const getUserCart = (userId: string): Omit<CartsEntity, 'userId'> => {
    const { userCarts, activeCartId } = getUserCartAndActiveCartId({ carts, userId });
    if (activeCartId) {
        return pick(userCarts[activeCartId], ['id', 'isDeleted', 'items'])
    }
    return createNewCart();
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
    return createNewCart();
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
}

export default { getUserCart, updateUserCart, emptyUserCart, createOrder }
