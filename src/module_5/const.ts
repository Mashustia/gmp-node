export const PORT = process.env.PORT || 3000;

export const BASE_URL = 'http://localhost:3000';

export const Method = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
}

export const Path = {
    users: '/users',
    user: '/users/:id',
    hobbies: '/users/:id/hobbies',
}

export const StatusCode = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}
