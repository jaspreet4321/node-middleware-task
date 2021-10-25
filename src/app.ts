import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
const session = require('express-session');

import route from "./route";
import fs from "fs";

declare module 'express-session' {
    interface SessionData {
        email: string;
    }
}
const app = express();


app.use(session({ secret: 'test_secret', saveUninitialized: true, resave: true, }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let userSession;
const apiAuthMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.email && (req.originalUrl.indexOf("/pub/proxy") > -1 || req.originalUrl.indexOf("/api/proxy") > -1)) {
        next();
    } else {
        res.send({ status: false, msg: "url not start pub/proxy or api/proxy" })
    }
}
app.post('/login', (req: Request, res: Response) => {
    userSession = req.session;
    req.session['email'] = req.body.email;
    res.end('done');
})
app.use(apiAuthMiddleWare);
app.use("/pub/proxy",route);
app.use("/api/proxy",route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, true);
    return res.status(400).json({
        error: err.message,
    });
});

export default app;