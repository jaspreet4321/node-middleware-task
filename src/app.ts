import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import baseRoute from './route';
import { middleWare } from "./common/middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleWare);
app.use(baseRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err, true);
    return res.status(400).json({
        error: err.message,
    });
});

export default app;