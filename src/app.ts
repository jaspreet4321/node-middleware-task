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
    console.log(req.originalUrl, "req.originalUrl", req.originalUrl.indexOf("/pub/proxy"));
    userSession = req.session;
    req.session['email'] = req.body.email;
    res.end('done');
})
app.use(apiAuthMiddleWare);
app.use("/pub/proxy",route);
app.use("/api/proxy",route);
// app.post(`/save/:id`, (req: Request, res: Response) => {
//     if (!fs.existsSync(`${__dirname}/data`)) {
//         fs.mkdirSync(`${__dirname}/data`);
//     }
//     fs.writeFile(`${__dirname}/data/${req.params.id}.json`,
//         JSON.stringify(req.body, null, 2),
//         (err: any = {}) => {
//             if (err) throw err;
//             res.status(201).json("The file has been saved!");
//         }
//     );
// });

// app.get("pub/proxy/save/:id", (req: Request, res: Response) => {
//     console.log('request data ', req.session)
//     let data = fs.readFileSync(`${__dirname}/data/${req.params.id}.json`, "utf-8");
//     res.status(200).json(JSON.parse(data));
// }
// );

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, true);
    return res.status(400).json({
        error: err.message,
    });
});

export default app;