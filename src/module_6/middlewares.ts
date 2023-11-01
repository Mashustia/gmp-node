import { NextFunction, Request, Response } from 'express';
import * as jwt from "jsonwebtoken";

import { getErrorMessage } from './utils';
import { StatusCode } from '../module_5/const';
import { errorMessage } from './consts';
import { CurrentUser } from '../module_7/entities/types';

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
        const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
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
