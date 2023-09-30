import http from 'http';
import { BASE_URL, Method, PORT, StatusCode } from './const';
import {
    jsonResponse,
    matchUserHobbiesRoute,
    matchUserRoute,
    matchUsersRoute,
    genericMessage, getId, userNotFoundMessage
} from './utils';
import {
    addHobby,
    addUser,
    deleteHobbies,
    deleteUser,
    editUser,
    getUser,
    getUserHobbies,
    getUsers
} from './userMethods';

const server = http.createServer((req, res) => {
    const url = new URL(req.url!, BASE_URL);
    const { pathname } = url;
    const { method } = req;

    if (matchUsersRoute(pathname)) {
        if (method === Method.GET) {
            const users = getUsers();
            return jsonResponse({
                res,
                dataToStringify: users,
                statusCode: StatusCode.OK
            });
        }

        if (method === Method.POST) {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                const user = addUser(parsedBody);
                return jsonResponse({
                    res,
                    dataToStringify: user,
                    statusCode: StatusCode.CREATED
                })
            });
            return;
        }
    }

    if (matchUserRoute(pathname)) {
        const id = getId(pathname);

        if (method === Method.GET) {
            const user = getUser(id);
            if (user === null) {
                return userNotFoundMessage(res);
            }
            return jsonResponse({
                res,
                dataToStringify: user,
                statusCode: StatusCode.OK
            });
        }

        if (method === Method.PUT) {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                const user = editUser(parsedBody);
                if (user === null) {
                    return userNotFoundMessage(res);
                }
                return jsonResponse({
                    res,
                    dataToStringify: user,
                    statusCode: StatusCode.OK
                })
            });
            return;
        }

        if (method === Method.DELETE) {
            const userDeleted = deleteUser(id);
            if (userDeleted === null) {
                return userNotFoundMessage(res);
            }
            return genericMessage({
                res,
                message: 'User deleted',
                statusCode: StatusCode.OK
            })
        }
    }

    if (matchUserHobbiesRoute(pathname)) {
        const id = getId(pathname);

        if (method === Method.GET) {
            const hobbies = getUserHobbies(id);
            if (hobbies === null) {
                return userNotFoundMessage(res);
            }

            return jsonResponse({
                res,
                dataToStringify: hobbies,
                statusCode: StatusCode.OK
            });
        }

        if (method === Method.PUT) {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const parsedBody = JSON.parse(body);
                const hobbies = addHobby({ id, hobbies: parsedBody })
                if (hobbies === null) {
                    return userNotFoundMessage(res);
                }
                return jsonResponse({
                    res,
                    dataToStringify: hobbies,
                    statusCode: StatusCode.OK
                })
            });
            return;
        }

        if (method === Method.DELETE) {
            const hobbiesDeleted = deleteHobbies(id);
            if (hobbiesDeleted === null) {
                return userNotFoundMessage(res);
            }
            return genericMessage({
                res,
                message: 'Hobbies deleted',
                statusCode: StatusCode.OK
            })
        }
    }

    return genericMessage({
        res,
        message: StatusCode.NOT_FOUND,
        statusCode: StatusCode.NOT_FOUND
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
