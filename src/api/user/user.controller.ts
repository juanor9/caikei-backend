import { Request, Response } from "express";
import crypto from "crypto";
import { createUser, updateUser } from "./user.services";
import { verifyToken, signToken } from "../../auth/auth.services";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

export async function handleCreateUser(req: Request, res: Response): Promise<void> {
  const data = req.body;
  const newUser = { ...data, isActive: true };

  try {
    // Crear usuario
    const user = await createUser(newUser);

    // Enviar correo de verificación (se podría implementar aquí si es necesario)

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: "An error occurred while creating the user", error: error.message });
  }
}

export async function handleGetUser(req: Request, res: Response): Promise<void> {
  try {
    // Obtener el token de autorización
    const userToken = req.headers?.authorization?.split(" ")[1];
    if (!userToken) {
      res.status(401).json({ message: "You are not authorized to access this information" });
      return;
    }

    let decoded;
    try {
      decoded = verifyToken(userToken);
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    res.status(200).json(decoded);
  } catch (error: any) {
    res.status(500).json({ message: "An error occurred while retrieving user information", error: error.message });
  }
}

export async function handleUpdateUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const data = req.body;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing user ID" });
    return;
  }

  try {
    // Verificar si la nueva información incluye una contraseña para actualizar
    if (data.password) {
      // Encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Actualizar el usuario
    const user = await updateUser(id, data);

    if (!user) {
      res.status(404).json({ message: "User not found to update" });
      return;
    }

    // Crear un nuevo token con el perfil actualizado
    const newToken = signToken(user.profile);
    // Crear un objeto con la nueva información
    const newData = {
      newUser: user,
      newToken: newToken,
    };

    res.status(200).json(newData);
  } catch (error: any) {
    res.status(500).json({ message: "An error occurred while updating the user", error: error.message });
  }
}
