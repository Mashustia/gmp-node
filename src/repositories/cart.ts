import {
    fetchCartAndTotalPrice,
} from '../utils';
import { getProductById } from './product';
import {
    CartTemplate,
    ProductData,
    CartModelAndMethods
} from '../entities/types';
import Cart from '../entities/cart';

const getActiveCart = async (userId: string): Promise<CartModelAndMethods | null> => {
    return await Cart.findOne({ user: userId, isDeleted: false }).exec();
}

export const createCart = async (userId: string): Promise<CartModelAndMethods | null> => {
    const newCart = await Cart.create({
        user: userId,
        items: [],
    });

    return newCart || null;
};

const getUserCart = async (userId: string): Promise<CartTemplate | null> => {
    const activeCart = await getActiveCart(userId);

    if (activeCart) {
        return fetchCartAndTotalPrice(activeCart);
    }

    const newCart = await createCart(userId);

    if (newCart) {
        return {
            cart: {
                id: newCart._id,
                items: newCart.items,
            },
            total: 0
        }
    }
    return null;
}

const updateUserCart = async (userId: string, product: ProductData): Promise<CartTemplate | null> => {
    const activeCart = await getActiveCart(userId);
    if (activeCart) {
        const productIndex = activeCart.items.findIndex((item) => item.product.id === product.productId)
        const productIsInCart = productIndex !== -1;
        const needToDeleteProduct = product.count === 0;
        if (productIsInCart && needToDeleteProduct) {
            activeCart.items = activeCart.items.filter((item) => item.product.id !== product.productId);

            return await activeCart.save()
                .then(savedCart => fetchCartAndTotalPrice(savedCart))
                .catch(err => null)
        }

        if (productIsInCart) {
            activeCart.items[productIndex].count = activeCart.items[productIndex].count + product.count;

            return await activeCart.save()
                .then(savedCart => fetchCartAndTotalPrice(savedCart))
                .catch(err => null)
        }

        const productFullInfo = await getProductById(product.productId)
        if (productFullInfo) {
            activeCart.items = [
                ...activeCart.items,
                {
                    product: productFullInfo,
                    count: product.count
                }
            ]

            return await activeCart.save()
                .then(savedCart => fetchCartAndTotalPrice(savedCart))
                .catch(err => null)
        }

        return null;
    }
    return null;
}

const deleteUserCart = async (userId: string): Promise<boolean> => {
    const activeCart = await getActiveCart(userId);
    if (activeCart) {
        activeCart.isDeleted = true;
        await activeCart.save();

        return true;
    }
    return false;
}

export { getUserCart, updateUserCart, deleteUserCart, getActiveCart }
