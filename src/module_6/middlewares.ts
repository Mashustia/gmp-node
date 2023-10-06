import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`New request: ${req.method}, ${req.url}`);
    next();
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, 'here');
    res.status(500);
    res.send({message: err.message});
};
