import { Schema, model } from 'mongoose';

import { ProductModel } from './types';

export const ProductSchema = new Schema<ProductModel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Product = model<ProductModel>('Product', ProductSchema);

export default Product;
