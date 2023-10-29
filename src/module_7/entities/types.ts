import { CartItemEntity } from '../../module_6/dataBase/carts';

interface CartModel {
    id: string
    isDeleted: boolean
    items: CartItemEntity[]
    user: string
    payment: {
        type: string
        address?: string
        creditCard?: string
    }
    delivery: {
        type: string
        address: string
    }
    comments: string
    status: string
    total: number
}

interface OrderModel {
    id: string
    user: string
    cartId: string
    items: CartItemEntity[];
}

interface UserModel {
    id: string
    email: string
    cart?: CartModel
    orders: OrderModel[]
}

export { UserModel, CartModel, OrderModel}
