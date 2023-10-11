import { CartItemEntity, cart, userId } from './carts';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
    id: string, // uuid
    userId: string;
    cartId: string;
    items: CartItemEntity[] // products from CartItemEntity
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    comments: string,
    status: ORDER_STATUS;
    total: number;
}

const order: OrderEntity = {
    id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
    userId,
    cartId: '',
    items: cart.items,
    payment: {
        type: 'paypal',
        address: undefined,
        creditCard: undefined
    },
    delivery: {
        type: 'post',
        address: undefined
    },
    comments: '',
    status: 'created',
    total: 2,
}

export const orders = [order];
