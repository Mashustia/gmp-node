import { Method, StatusCode } from './const';
import { deleteUser, editUser, getUser } from './userMethods';
import { genericMessage, getId, jsonResponse, userNotFoundMessage } from './utils';
import { ServerResponse, IncomingMessage } from 'http';

export const userPathHandler = ({ method, res, req, pathname }: {
    method: string | undefined,
    res: ServerResponse,
    req: IncomingMessage,
    pathname: string
}) => {
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
