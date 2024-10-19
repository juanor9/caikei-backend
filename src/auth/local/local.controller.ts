import { NextFunction, Request, Response } from "express";
import { getUserFilter } from "../../api/user/user.services";
import { signToken } from "../auth.services";

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verificar si el usuario está activo
    if (user.isActive !== true) {
      res.status(401).json({ message: "User is not active" });
      return;
    }

    // Verificar la contraseña
    let validPassword;
    try {
      validPassword = await user.comparePassword(password);
    } catch (err) {
      res.status(500).json({ message: "Error verifying password" });
      return;
    }

    if (!validPassword) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Crear el JWT
    const jwtPayload = user.profile;
    const userToken = signToken(jwtPayload);

    res.status(200).json({ profile: user.profile, userToken });
  } catch (error: any) {
    res.status(500).json({ message: "An error occurred during login", error: error.message });
  }
}
