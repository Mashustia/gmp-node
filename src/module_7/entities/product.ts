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

// @Entity()
// class Product {
//     @PrimaryKey()
//     id: string = uuidv4();
//
//     @Property()
//     title!: string;
//
//     @Property()
//     description!: string;
//
//     @Property()
//     price!: number;
//
//     constructor(title: string, description: string, price: number) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//     }
// }
//
// export default Product;
