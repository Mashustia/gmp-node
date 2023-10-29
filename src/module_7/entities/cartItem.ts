import * as mongoose from 'mongoose';
import { ProductSchema } from './product';
const {Schema} = mongoose;

export const CartItemSchema = new Schema({
    product: ProductSchema,
    count: {
        type: Number,
        required: true,
    }
})
