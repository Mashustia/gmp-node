import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getErrorMessage, getSuccessMessage, loggerCall } from '../utils';
import { errorMessage, StatusCode } from '../consts';
import { findUserByEmail } from './users';

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            loggerCall('loginController', errorMessage.all_input_is_required);
            return getErrorMessage({
                res,
                statusCode: StatusCode.BAD_REQUEST,
                message: errorMessage.all_input_is_required
            })
        }

        const user = await findUserByEmail(email);
        if (!user) {
            loggerCall('loginController', errorMessage.user_not_found);
            return getErrorMessage({
                res,
                statusCode: StatusCode.NOT_FOUND,
                message: errorMessage.user_not_found
            })
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (passwordMatches) {
            const token = jwt.sign(
                { id: user._id, email, role: user.role },
                process.env.TOKEN_KEY!,
                {
                    expiresIn: '2h',
                }
            );

            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: {
                    access_token: token,
                },
            });
        }

        loggerCall('loginController', errorMessage.invalid_password);
        return getErrorMessage({
            res,
            statusCode: StatusCode.BAD_REQUEST,
            message: errorMessage.invalid_password
        })
    } catch (err) {
        loggerCall('loginController', errorMessage.internal_server_error);
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.internal_server_error
        })
    }
}

export default loginController;
