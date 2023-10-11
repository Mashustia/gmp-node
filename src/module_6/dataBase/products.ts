export interface ProductEntity {
    id: string; // uuid
    title: string;
    description: string;
    price: number;
}

const product_1_id = '51422fcd-0366-4186-ad5b-c23059b6f64f';
const product_2_id = '1b745aab-8396-4c34-aeab-4766933af045';

export const product_1: ProductEntity = {
    id: product_1_id,
    title: 'Book',
    description: 'A very interesting book',
    price: 100
}

export const product_2: ProductEntity = {
    id: product_2_id,
    title: 'Book',
    description: 'Not very interesting book',
    price: 250
}

const products: ProductEntity[] = [
    product_1,
    product_2,
]

export default products;
