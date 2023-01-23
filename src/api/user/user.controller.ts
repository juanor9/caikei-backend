import {Request, Response} from 'express';

export async function handleCreateUser(req: Request, res: Response){
    const data = req.body;
    const newUser = data;
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}