import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getErrorMessage, getSuccessMessage } from '../utils';
import { StatusCode } from '../../module_5/const';
import { errorMessage } from '../consts';
import { createUser, findUserByEmail } from './users';
import { Role } from '../../module_7/entities/types';

const registrationController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { first_name, last_name, admin, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            return getErrorMessage({
                res,
                statusCode: StatusCode.BAD_REQUEST,
                message: errorMessage.all_input_is_required
            })
        }

        const registeredUser = await findUserByEmail(email);

        if (registeredUser) {
            return getErrorMessage({
                res,
                statusCode: StatusCode.CONFLICT,
                message: errorMessage.user_exist
            })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const userId = await createUser({
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: admin === 'true' ? Role.admin : Role.user
        });

        if (userId) {
            return getSuccessMessage({
                res,
                statusCode: StatusCode.CREATED,
                data: {
                    id: userId,
                },
            });
        }
    } catch (err) {
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.internal_server_error
        })
    }
}

export default registrationController;
