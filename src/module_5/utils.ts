import { Path, StatusCode } from './const';
import { ServerResponse } from 'http';

export const matchUsersRoute = (pathname: string) => Path.users === pathname;
export const matchUserRoute = (pathname: string) => {
    const modifiedPath = pathname.split('/');
    const id = modifiedPath[2]
    const userRoute = `${Path.users}/${id}`;
    if (id) {
        return userRoute === pathname;
    }
    return false;
};

export const matchUserHobbiesRoute = (pathname: string) => {
    const modifiedPath = pathname.split('/');
    const id = modifiedPath[2]
    const userRoute = Path.hobbies.replace(':id', id);
    if (id) {
        return userRoute === pathname;
    }
    return false;
};

export const getErrorMessage = (error: string | number) => `<p>${error}</p>`

export const genericMessage = ({
    res,
    message,
    statusCode
}: {
    res: ServerResponse,
    message: string | number,
    statusCode: number
}) => {
    res.writeHead(statusCode);
    res.end(getErrorMessage(message));
}

export const jsonResponse = ({
    res, dataToStringify, statusCode
}: {
    res: ServerResponse,
    dataToStringify: any,
    statusCode: number
}) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dataToStringify));
}

export const getId = (pathname: string): number => {
    const id = pathname.split('/')[2];
    return parseInt(id, 10);
}

export const userNotFoundMessage = (res: ServerResponse) => genericMessage({
    res,
    message: 'User not found',
    statusCode: StatusCode.NOT_FOUND
});
