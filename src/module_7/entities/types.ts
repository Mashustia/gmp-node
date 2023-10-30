import { Document, Model, ObjectId } from 'mongoose';

interface ProductModel extends Document {
    _id: ObjectId
    title: string
    description: string
    price: number
}

interface CartItemModel {
    product: ProductModel
    count: number
}

interface OrderModel extends Document {
    _id: ObjectId
    userId: ObjectId
    cartId: ObjectId
    items: CartItemModel[]
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

interface ICart extends Document {
    _id: ObjectId
    user: ObjectId
    isDeleted: boolean
    items: CartItemModel[]
}

interface ICartMethods {
    clearCart(): void
}

type CartModel = Model<ICart, {}, ICartMethods>
type CartModelAndMethods = ICart & ICartMethods

interface UserModel extends Document {
    _id: ObjectId
    email: string
}

interface ProductData {
    productId: string
    count: number
}

interface CartTemplate {
    cart: {
        id: ObjectId
        items: CartItemModel[]
    }
    total: number
}

export {
    UserModel,
    ICart,
    ICartMethods,
    CartModel,
    CartModelAndMethods,
    OrderModel,
    ProductModel,
    CartItemModel,
    ProductData,
    CartTemplate,
}
