import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { getErrorMessage, getSuccessMessage } from '../utils';
import { StatusCode } from '../../module_5/const';
import { errorMessage } from '../consts';
import { findUserByEmail } from './users';

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!(email && password)) {
            res.status(400).send('All input is required');

            return getErrorMessage({
                res,
                statusCode: StatusCode.BAD_REQUEST,
                message: errorMessage.all_input_is_required
            })
        }

        const user = await findUserByEmail(email);
        if (user) {
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role },
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

        return getErrorMessage({
            res,
            statusCode: StatusCode.BAD_REQUEST,
            message: errorMessage.invalid_credentials
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
