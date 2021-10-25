import  { Request, Response } from 'express';
import fs from "fs";

export async function addUser(req: Request, res: Response) {
    if (!fs.existsSync(`${__dirname}/data`)) {
        fs.mkdirSync(`${__dirname}/data`);
    }
    fs.writeFile(`${__dirname}/data/${req.params.id}.json`,
        JSON.stringify(req.body, null, 2),
        (err: any = {}) => {
            if (err) throw err;
            res.status(201).json("The file has been saved!");
        }
    );
}

export async function fetchUser(req: Request, res: Response) {
    let data = fs.readFileSync(`${__dirname}/data/${req.params.id}.json`, "utf-8");
    res.status(200).json(JSON.parse(data));
}