import { Request, Response } from "express";
import crypto from "crypto";
import { createUser } from "./user.services";
import { verifyToken } from "../../auth/auth.services";

export async function handleCreateUser(req: Request, res: Response) {
  const data = req.body;
  const newUser = data;
  try {
    //Create email verification token
    const hash = crypto.createHash("sha256").update(data.email).digest("hex");
    newUser.emailConfirmToken = hash;
    newUser.emailConfirmExpires = Date.now() + 3_600_000 * 48;

    //Create user
    const user = await createUser(data);

    // Send verification email
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetUser(req: Request, res: Response) {
  try {
    const userToken = req.headers?.authorization?.split(" ")[1] as string;
    if (!userToken) {
      return res
        .status(401)
        .json({
          message: "You are not authorized to access to this information",
        });
    }
    const decoded = verifyToken(userToken);
    return res.status(200).json(decoded);
  } catch (error) {
    return res.status(500).json(error);
  }
}
