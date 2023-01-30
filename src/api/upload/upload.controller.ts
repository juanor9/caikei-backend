import { Request, Response } from 'express';
import fs from 'fs';
import uploadImage from './upload.services';

export async function handleUploadSingle(
    req: Request, res: Response
){
    const {path, size} = req.file as Express.Multer.File;
    console.log(req.file);
    const maxSize = 1024 *1024*2;

    if(size > maxSize){
        fs.unlinkSync(path);
        return res.status(400).json({message: "File is too large"});
    }
    try {
        const result = await uploadImage(path);
        res.json(result);
    } catch (error:any) {
        return res.status(500).json({message: error.message});
    } finally{
        fs.unlinkSync(path);
    }
}