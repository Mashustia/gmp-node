import http from 'http';
import { BASE_URL, PORT, StatusCode } from './const';
import {
    matchUserHobbiesRoute,
    matchUserRoute,
    matchUsersRoute,
    genericMessage,
} from './utils';
import { usersPathHandler } from './usersPathHandler';
import { userPathHandler } from './userPathHandler';
import { hobbiesPathHandler } from './hobbiesPathHandler';

const server = http.createServer((req, res) => {
    const url = new URL(req.url!, BASE_URL);
    const { pathname } = url;
    const { method } = req;

    if (matchUsersRoute(pathname)) {
        usersPathHandler({ method, res, req })
        return;
    }

    if (matchUserRoute(pathname)) {
        userPathHandler({ method, res, req, pathname })
        return;
    }

    if (matchUserHobbiesRoute(pathname)) {
        hobbiesPathHandler({ method, res, req, pathname })
        return;
    }

    return genericMessage({
        res,
        message: StatusCode.NOT_FOUND,
        statusCode: StatusCode.NOT_FOUND
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
