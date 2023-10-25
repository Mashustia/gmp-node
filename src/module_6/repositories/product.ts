import { DI } from '../app';
import Product from '../../module_7/entities/product';

const getProductsList = async (): Promise<Product[]> => {
    const products = await DI.product.findAll();
    return products;
};
const getProductById = async (productId: string): Promise<Product | null> => {
    const product = await DI.product.findOne(productId);
    if (product) {
        return product
    }

    return null;
}

export { getProductById, getProductsList };
