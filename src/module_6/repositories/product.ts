import { Schema } from 'mongoose';

import { ProductModel } from '../../module_7/entities/types';
import Product from '../../module_7/entities/product';

const getProductsList = async (): Promise<ProductModel | null> => {
    return await Product.findOne({}).exec();
};
const getProductById = async (productId: Schema.Types.ObjectId): Promise<ProductModel | null> => {
    const product = await Product.findOne({ _id: productId }).exec();
    if (product) {
        return product
    }

    return null;
}

export { getProductById, getProductsList };
