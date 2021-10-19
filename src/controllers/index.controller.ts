import { Request, Response } from 'express';
import { Post } from '../interface/post';
import { _fetchData, _insertData, getRandomInt } from "../common/function";

export async function addUser(req: Request, res: Response) {
    const _userExist = _fetchData();
    const newPost: Post = req.body;
    if (newPost.title == null || newPost.description == null) {
        return res.status(401).send({ error: true, msg: 'Data missing' })
    }
    const _exist = await _userExist.find((user: any) => user.title === newPost.title)
    if (_exist) {
        return res.status(409).send({ error: true, msg: 'same title name not allowed' })
    }
    newPost.uniqueId = getRandomInt();
    _userExist.push(newPost)
    _insertData(_userExist);
    res.send({ success: true, msg: 'Post added successfully', data: _userExist })
}

export async function fetchUser(req: Request, res: Response) {
    const _dataToFind = _fetchData();
    let _getData = await _dataToFind.find((user: any) => user.uniqueId === req.body.uniqueId)
    res.send({ success: true, msg: "Post Details", data: _getData })
}