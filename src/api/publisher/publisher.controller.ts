import { createPublisher, getPublisherById, updatePublisher, getPublisherFilter } from "./publisher.services";
import { getUserById } from "../user/user.services";
import { Request, Response } from "express";
import { verifyToken } from "../../auth/auth.services";
import { Types } from "mongoose";

export async function handleCreatePublisher(req: Request, res: Response): Promise<void> {
  const data = req.body;
  const userToken = req.headers?.authorization?.split(" ")[1];

  try {
    // Verificar el token de usuario
    if (!userToken) {
      res.status(401).json({ message: "You are not authorized to create a publisher" });
      return;
    }

    // Decodificar el token, asegurándose de manejar el caso en que el token sea inválido
    let decoded;
    try {
      decoded = verifyToken(userToken);
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Verificar que el token decodificado tiene la estructura esperada
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !("_id" in decoded) ||
      typeof (decoded as any)._id !== "string"
    ) {
      res.status(401).json({ message: "Invalid token data" });
      return;
    }

    const { _id } = decoded as { _id: string };

    // Activar el publisher
    const newPublisher = {
      ...data,
      isActive: true,
    };

    // Crear el publisher
    const publisher = await createPublisher(newPublisher);

    // Obtener el usuario
    const user = await getUserById(_id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Asegurarse de convertir `publisher._id` a string antes de asignarlo
    user.publisher = String(publisher._id);
    await user.save(); // Asegurar que se espere al guardado

    // Devolver la respuesta
    const returnData = { publisher, user };
    res.status(200).json(returnData);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the publisher", error });
  }
}

export async function handleGetPublisherById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing publisher ID" });
    return;
  }

  try {
    const publisher = await getPublisherById(id);

    // Si no se encuentra el publisher, devolver un 404
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
      return;
    }

    // Devolver el publisher encontrado
    res.status(200).json(publisher);
  } catch (error) {
    // Manejar cualquier error durante la operación
    res.status(500).json({ message: "An error occurred while fetching the publisher", error });
  }
}

export async function handleGetPublisherByFilter(req: Request, res: Response): Promise<void> {
  const filter = req.query;

  // Verificar si el filtro está vacío
  if (!filter || Object.keys(filter).length === 0) {
    res.status(400).json({ message: "No filter provided" });
    return;
  }

  try {
    const publisher = await getPublisherFilter(filter);

    // Si no se encuentra ningún publisher, devolver un array vacío
    if (!publisher || (Array.isArray(publisher) && publisher.length === 0)) {
      res.status(404).json({ message: "No publisher found with the given filter" });
      return;
    }

    // Devolver el/los publisher(s) encontrados
    res.status(200).json(publisher);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the publisher(s)", error });
  }
}

export async function handleUpdatePublisher(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const data = req.body;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing publisher ID" });
    return;
  }

  try {
    // Actualizar el publisher con los datos proporcionados
    const publisher = await updatePublisher(id, data);

    // Si el publisher no se encuentra, devolver un error 404
    if (!publisher) {
      res.status(404).json({ message: "Publisher not found" });
      return;
    }

    // Devolver el publisher actualizado
    res.status(200).json(publisher);
  } catch (error) {
    // Manejar cualquier error durante la operación
    res.status(500).json({ message: "An error occurred while updating the publisher", error });
  }
}