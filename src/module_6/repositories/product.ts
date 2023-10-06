import products from '../dataBase/products';
import { errorMessage } from '../consts';

const getProducts = () => products;
const getProduct = (productId: string) => {
    const product = products.find((item) => item.id === productId)
    if (product) {
        products.push(product);
        return product
    }

    throw new Error(errorMessage.no_product_with_id);
}

export default { getProduct, getProducts };
