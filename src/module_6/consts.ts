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
    no_product_with_id: 'No product with such id',
    x_user_id_is_missing: 'Header x-user-id is missing',
    dont_have_permission: 'You don\'t have permission to access this resource',
    user_not_found: 'User is not found',
    authorization_header_is_missing: 'You must be authorized user',
    no_user_matching_authorization_header_is_found: 'User is not authorized',
    internal_server_error: 'Internal Server error',
    no_product_found: 'No product with such id',
}
