import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getErrorMessage, getSuccessMessage } from '../utils';
import { errorMessage, StatusCode, TOKEN_KEY } from '../consts';
import { findUserByEmail } from './users';

const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return getErrorMessage({
                res,
                statusCode: StatusCode.BAD_REQUEST,
                message: errorMessage.all_input_is_required
            })
        }

        const user = await findUserByEmail(email);
        if (!user) {
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
                TOKEN_KEY,
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

        return getErrorMessage({
            res,
            statusCode: StatusCode.BAD_REQUEST,
            message: errorMessage.invalid_password
        })
    } catch (err) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.internal_server_error
        })
    }
}

export default loginController;
