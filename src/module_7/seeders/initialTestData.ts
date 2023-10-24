import { EntityManager } from '@mikro-orm/core';
import { product_1, product_2 } from '../../module_6/dataBase/products';
import Product from '../entities/product';
import User from '../entities/user';
import Cart from '../entities/cart';
import Order from '../entities/order';

const initialTestData = async (em: EntityManager): Promise<void> => {
    const product1 = new Product(product_1.title, product_1.description, product_1.price);
    const product2 = new Product(product_2.title, product_2.description, product_2.price);

    await em.persistAndFlush([product1, product2]);

    const userA = new User('User A');
    const userB = new User('User B');

    const cart1 = new Cart(userA);
    const cart2 = new Cart(userB);

    cart1.addItem(product1, 1);
    cart1.addItem(product2, 2);
    cart2.addItem(product2, 3);

    await em.persistAndFlush([cart1, cart2]);

    const order1 = new Order(
        userA,
        cart1.id,
        [
            { product: product1, count: 1 },
            { product: product2, count: 2 },
        ],
        {
            type: 'paypal',
            address: 'Mangilik el',
            creditCard: '0000-0000-0000-0000',
        },
        {
            type: 'post',
            address: 'Mangilik el',
        },
        'created',
        600,
        'test item 1'
    );
    const order2 = new Order(
        userB,
        cart2.id,
        [{ product: product2, count: 3 }],
        {
            type: 'credit card',
            address: 'Al Farabi',
            creditCard: '9999-9999-9999-9999',
        },
        {
            type: 'express',
            address: 'Al Farabi',
        },
        'pending',
        750,
        'test item 2'
    );

    await em.persistAndFlush([order1, order2]);
};

export default initialTestData;
