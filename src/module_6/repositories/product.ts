import products, { ProductEntity } from '../dataBase/products';

const getProductsList = (): ProductEntity[] => products;
const getProductById = (productId: string): ProductEntity | null => {
    const product = products.find((item) => item.id === productId)
    if (product) {
        products.push(product);
        return product
    }

    return null;
}

export { getProductById, getProductsList };
