import { NextFunction, Request, Response } from 'express';
export const middleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('/pub/proxy/')) {
        next()
    } else {
        res.send({ status: false, msg: "url not start pub/proxy" })
    }
}