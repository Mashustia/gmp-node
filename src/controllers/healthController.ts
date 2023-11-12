import { Request, Response } from 'express';
import mongoose from 'mongoose';
import debug from 'debug';

import { getErrorMessage, getSuccessMessage } from '../utils';
import { errorMessage, StatusCode } from '../consts';

const debugLogger = debug('my-app');

const healthController = async (req: Request, res: Response) => {
    try {
        const dbAdmin = mongoose.connection.db.admin();
        const { ok } = await dbAdmin.ping();
        if (ok) {
            debugLogger('Health check succeeded');
            return getSuccessMessage({
                res,
                statusCode: StatusCode.OK,
                data: null,
            });
        }


        debugLogger(`Health check ${errorMessage.server_connection_error}: ${StatusCode.INTERNAL_SERVER_ERROR}`);
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.server_connection_error
        })
    } catch (error) {
        debugLogger(`Health check error: ${error}`);
        return getErrorMessage({
            res,
            statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessage.health_check_failed
        })
    }
}

export default healthController;
