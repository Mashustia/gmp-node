import { Method, StatusCode } from './const';
import { addUser, getUsers } from './userMethods';
import { jsonResponse } from './utils';
import { ServerResponse, IncomingMessage } from 'http';

export const usersPathHandler = ({ method, res, req }: {
    method: string | undefined,
    res: ServerResponse,
    req: IncomingMessage
}) => {
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
