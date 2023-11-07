import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { getErrorMessage, getSuccessMessage } from '../utils';
import { errorMessage, StatusCode } from '../consts';
import { createUser, findUserByEmail } from './users';
import { Role } from '../entities/types';

const registrationController = async (req: Request, res: Response) => {
    try {
        const { admin, email, password } = req.body;

        if (!(email && password && admin)) {
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
            role: admin === Role.admin ? Role.admin : Role.user
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
