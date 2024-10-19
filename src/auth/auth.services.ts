import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import { getUserFilter } from "../api/user/user.services";

//Sign Token
export function signToken(payload: any) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(payload, secret);

  return token;
}

//Verify Token
export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  try {
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {
    return false;
  }
}

//isAuthenticated
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userToken = req.headers?.authorization?.split(" ")[1];

  if (!userToken) {
    res.status(401).json({ message: "Invalid user token" });
    return; // Asegúrate de detener la ejecución aquí
  }

  const decoded = verifyToken(userToken);

  if (!decoded) {
    res.status(401).json({ message: "Token undecoded" });
    return; // Asegúrate de detener la ejecución aquí
  }

  console.log('Request authorized');
  next();  // Continúa al siguiente middleware/controlador
}

// Get user by id from token
// export interface JWTDecoded {
//   _id: string,
//   email: string,
//   iat: number,
// }
// export async function getUserFromToken(decoded: JWTDecoded) {
//   try {
//     if (typeof decoded !== "object") {
//       throw new Error("token is not valid");
//     }
//     if (!decoded.hasOwnProperty("_id")) {
//       throw new Error("token is not valid");
//     }
//     const userId:string = decoded._id;
//     const user = await getUserFilter({ _id: userId });
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return userId;
//   } catch(err:any) {
//     return err.message;
//   }
// }
