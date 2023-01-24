import { Request, Response } from 'express';
import crypto from 'crypto';
import { createUser } from './user.services'


export async function handleCreateUser(req: Request, res: Response){
    const data = req.body;
    const newUser = data;
    try {

      //Create email verification token
      const hash = crypto.createHash('sha256').update(data.email).digest('hex');
      newUser.emailConfirmToken = hash;
      newUser.emailConfirmExpires= Date.now() + 3_600_000 * 48;

      //Create user
      const user = await createUser(data);

      // Send verification email
      return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error);
    }
}