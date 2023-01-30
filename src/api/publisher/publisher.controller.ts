import { Request, Response } from "express";
import { verifyToken } from "../../auth/auth.services";
import { createPublisher } from "./publisher.services";
import { getUserById } from "../user/user.services";

export async function handleCreatePublisher(req: Request, res: Response) {
  const data = req.body;
  const newPublisher = data;
  const userToken = req.headers?.authorization?.split(" ")[1] as string;

  try {
    // check user id from token
    if (!userToken) {
      return res
        .status(401)
        .json({ message: "You are not authorized to create a publisher" });
    }
    const decoded = verifyToken(userToken) as {
      _id: string;
      role: string;
      email: string;
      iat: number;
    };
    // activate publisher
    newPublisher.isActive = true;
    // create publisher
    const publisher = await createPublisher(data);

    //get user
    const user = await getUserById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // add publisher to user
    user.publisher = publisher._id;

    user.save();
    const returnData = { publisher, user };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
}
