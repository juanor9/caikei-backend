import { Request, Response } from 'express';
import fs from 'fs';
import {uploadImage, uploadXLSX} from './upload.services';
import * as XLSX from 'xlsx';

export async function handleUploadSingle(
    req: Request, res: Response
){
    const {path, size} = req.file as Express.Multer.File;
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

export async function handleUploadXlsx(
    req: Request, res: Response
){
    const {path} = req.file as Express.Multer.File;

    try {

        const workbook = XLSX.readFile(path);
        const worksheet = workbook.Sheets['Hoja1'];
        const json = XLSX.utils.sheet_to_json(worksheet);

        res.json(json);
    } catch (error:any) {
        return res.status(500).json({message: error.message});
    } finally{
        fs.unlinkSync(path);
    }
}