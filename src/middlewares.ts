import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

import { getErrorMessage } from './utils';
import { errorMessage, StatusCode, TOKEN_KEY } from './consts';
import { CurrentUser, Role } from './entities/types';

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

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.UNAUTHORIZED,
            message: errorMessage.token_is_required
        })
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
        return getErrorMessage({
            res,
            statusCode: StatusCode.FORBIDDEN,
            message: errorMessage.invalid_token
        })
    }

    try {
        const user = jwt.verify(token, TOKEN_KEY!) as CurrentUser;
        req.user = user;
    } catch (error) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.UNAUTHORIZED,
            message: errorMessage.invalid_token
        })
    }

    return next();
}

export const isAdminCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isAdmin = req.user.role === Role.admin;

    if (!isAdmin) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.FORBIDDEN,
            message: errorMessage.not_admin
        })
    }

    return next();
}
