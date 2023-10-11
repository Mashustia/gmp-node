import { IncomingMessage, ServerResponse } from 'http';
import { genericMessage, getId, jsonResponse, userNotFoundMessage } from './utils';
import { Method, StatusCode } from './const';
import { addHobby, deleteHobbies, getUserHobbies } from './userMethods';

export const hobbiesPathHandler = ({ method, res, req, pathname }: {
    method: string | undefined,
    res: ServerResponse,
    req: IncomingMessage,
    pathname: string
}) => {
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
