import { Schema } from 'mongoose';

import { ProductSchema } from './product';

export const CartItemSchema = new Schema({
    product: ProductSchema,
    count: {
        type: Number,
        required: true,
    }
})
