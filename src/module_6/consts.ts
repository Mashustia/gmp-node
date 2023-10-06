export const Route = {
    cart: '/cart',
    product: '/:productId',
    api: '/api',
    products: '/products',
    checkout: '/checkout',
    default: '/',
    auth: '/auth',
    register: '/register',
    login: '/login',
}

export const Path = {
    cart: `${Route.api}${Route.cart}`,
    products: `${Route.api}${Route.products}`,
    auth: `${Route.api}${Route.auth}`,
}

export const errorMessage = {
    cart_not_found: 'Cart was not found',
    no_product_with_id: 'No product with such id'
}
