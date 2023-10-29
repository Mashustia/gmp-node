import { v4 as uuid } from 'uuid';
import { Schema, model } from 'mongoose';

export const ProductSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        alias: 'id',
        required: true,
    },
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

model('Product', ProductSchema);

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
