import { ProductEntity, product as bookProduct } from './product.entity'

export interface CartItemEntity {
    product: ProductEntity;
    count: number;
}

export interface CartsEntity {
    id: string; // uuid
    userId: string;
    isDeleted: boolean;
    items: CartItemEntity[];
}

export interface DeletedAndActiveCarts {
    [cartId: string]: CartsEntity
}

export interface Carts {
    [userId: string]: DeletedAndActiveCarts
}

const cartItem: CartItemEntity = {
    product: bookProduct,
    count: 2,
}

export const userId = '0fe36d16-49bc-4aab-a227-f84df899a6cb';
const cartId = '1434fec6-cd85-420d-95c0-eee2301a971d';

export const cart: CartsEntity = {
    id: cartId,
    userId,
    isDeleted: false,
    items: [cartItem],
}

const carts: Carts = {
    [userId]: {
        [cartId]: cart,
    }
};

export default carts
