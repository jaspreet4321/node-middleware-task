import { NextFunction, Request, Response } from 'express';
export const middleWare = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('/pub/proxy/') || req.originalUrl.includes('/api/proxy/')) {
        next()
    } else {
        res.send({ status: false, msg: "url not start pub/proxy or api/proxy" })
    }
}