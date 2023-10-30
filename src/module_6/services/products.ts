import { getProductById, getProductsList } from '../repositories/product';

const getProducts = async () => getProductsList();
const getProduct = async (productId: string) => getProductById(productId);

export { getProducts, getProduct }
