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
