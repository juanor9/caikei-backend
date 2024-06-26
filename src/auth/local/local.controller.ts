import { NextFunction, Request, Response } from "express";
import { getUserFilter } from "../../api/user/user.services";
import { signToken } from "../auth.services";

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  console.log("🚀 ~ password:", password)
  console.log("🚀 ~ email:", email)

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //verify if user is active
    if (user.isActive !== true)
    {return res.status(401).json({ message: "User is not active" });}
    
    // verify password
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //JWT
    const jwtPayload = user.profile;

    const userToken = signToken(jwtPayload);

    return res.status(200).json({ profile: user.profile, userToken });
  } catch (error) {
    return res.status(500).json(error);
  }
}
