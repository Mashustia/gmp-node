import { NextFunction, Request, Response } from 'express';
import { getErrorMessage, getXUserHeader } from './utils';
import { StatusCode } from '../module_5/const';
import { errorMessage } from './consts';
import { fetchUserController } from './controllers/users';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`New request: ${req.method}, ${req.url}`);
    next();
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, 'error text');
    res.status(StatusCode.INTERNAL_SERVER_ERROR);
    res.send({ message: errorMessage.internal_server_error });
    next();
};

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = getXUserHeader(req);

        if (!userId) {
            return getErrorMessage({
                res,
                statusCode: StatusCode.FORBIDDEN,
                message: errorMessage.authorization_header_is_missing
            })
        }

        const user = await fetchUserController(userId);


        if (user === null) {
            return getErrorMessage({
                res,
                statusCode: StatusCode.UNAUTHORIZED,
                message: errorMessage.no_user_matching_authorization_header_is_found
            })
        }

        next();
    } catch (error) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.FORBIDDEN,
            message: errorMessage.dont_have_permission
        })
    }
}
