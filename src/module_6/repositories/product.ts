import { orm } from '../app';
import Product from '../../module_7/entities/product';

const getProductsList = async (): Promise<Product[]> => {
    const products = await orm.em.find(Product, {});
    return products;
};
const getProductById = async (productId: string): Promise<Product | null> => {
    const product = await orm.em.findOne(Product, { id: productId });
    if (product) {
        return product
    }

    return null;
}

export { getProductById, getProductsList };
