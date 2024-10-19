import { Request, Response } from "express";
import { Types } from "mongoose";
import {
  createMovement,
  getMovementsByPublisher,
  getMovementById, 
  deleteMovementById,
} from "./movement.services";
import { getBookById } from "../book/book.services";


export async function HandleCreateMovement(req: Request, res: Response): Promise<void> {
  const newMovement = req.body;
  interface inventoryDocument {
    placeId: Types.ObjectId;
    copies: number;
  }
  const { kind, books, publisher, from, to } = newMovement;

  try {
    // Set actions when movement is 'ingreso'
    if (kind === "ingreso") {
      if (!publisher) {
        res.status(400).json({ message: "Publisher is required for ingreso movements" });
        return;
      }
      for (const book of books) {
        const { id, copies } = book;

        // Get books in the movement from database
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          continue; // Si el libro no existe, se salta al siguiente
        }

        // Get or initialize book inventory
        let inventory = bookToMod.inventory as inventoryDocument[] | undefined;
        if (!inventory) {
          inventory = [];
          bookToMod.inventory = inventory;
        }

        // if nothing in inventory, add it directly
        const storage = inventory.find((i) => i.placeId.toString() === publisher);
        if (storage) {
          storage.copies += Number(copies);
        } else {
          inventory.push({
            placeId: publisher,
            copies,
          });
        }

        await bookToMod.save();
      }
    }

    // Set actions when movement is 'remisión' or 'devolución'
    if (kind === "remisión" || kind === "devolución") {
      if (!from || !to) {
        res.status(400).json({ message: "'from' and 'to' are required for remisión or devolución movements" });
        return;
      }
      for (const book of books) {
        const { id, copies } = book;
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          continue;
        }

        let inventory = bookToMod.inventory as inventoryDocument[] | undefined;
        if (!inventory) {
          res.status(400).json({ message: "Inventory not found for book" });
          return;
        }

        // Remove copies from `from` storage
        const fromStorage = inventory.find((i) => i.placeId.toString() === from);
        if (!fromStorage || fromStorage.copies < copies) {
          continue;
        }
        fromStorage.copies -= copies;

        // Add copies to `to` storage
        let toStorage = inventory.find((i) => i.placeId.toString() === to);
        if (!toStorage) {
          inventory.push({
            placeId: to,
            copies,
          });
        } else {
          toStorage.copies += copies;
        }

        await bookToMod.save();
      }
    }

    // Set actions when movement is 'liquidación'
    if (kind === "liquidación") {
      if (!from) {
        res.status(400).json({ message: "'from' is required for liquidación movements" });
        return;
      }
      for (const book of books) {
        const { id, copies } = book;
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          continue;
        }

        let inventory = bookToMod.inventory as inventoryDocument[] | undefined;
        if (!inventory) {
          res.status(400).json({ message: "Inventory not found for book" });
          return;
        }

        // Remove copies from `from` storage
        const fromStorage = inventory.find((i) => i.placeId.toString() === from);
        if (fromStorage && fromStorage.copies >= copies) {
          fromStorage.copies -= copies;
        }

        await bookToMod.save();
      }
    }

    const movement = await createMovement(newMovement);

    // Enviar respuesta sin retornar explícitamente
    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function HandleGetMovementsByPublisher(
  req: Request,
  res: Response
): Promise<void> {
  const filter = req.query;

  // Verificar si el filtro está vacío
  if (!filter || Object.keys(filter).length === 0) {
    res.status(400).json({ message: "No filter provided" });
    return;
  }

  try {
    // Ajustar el filtro al tipo esperado por el servicio
    const validFilter: any = {};

    // Aquí puedes validar qué propiedades esperas, por ejemplo:
    if (filter.publisher) {
      validFilter.publisher = filter.publisher;
    }
    if (filter.kind) {
      validFilter.kind = filter.kind;
    }
    // Añadir cualquier otro filtro específico que necesites

    const movements = await getMovementsByPublisher(validFilter);

    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching movements", error });
  }
}

export async function handleGetMovementById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing movement ID" });
    return;
  }

  try {
    const movement = await getMovementById(id);

    // Si no se encuentra el movimiento, devolver un 404
    if (!movement) {
      res.status(404).json({ message: "Movement not found" });
      return;
    }

    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the movement", error });
  }
}

export async function handleDeleteMovementById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  // Validar que el ID es un ObjectId válido
  if (!id || !Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid or missing movement ID" });
    return;
  }

  try {
    const deletedMovement = await deleteMovementById(id);

    // Si el movimiento no se encuentra, devolver un 404
    if (!deletedMovement) {
      res.status(404).json({ message: "Movement not found" });
      return;
    }

    // Si se elimina exitosamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Movement deleted", movement: deletedMovement });
  } catch (error) {
    console.error("Error deleting movement:", error);
    res.status(500).json({ message: "An error occurred while deleting the movement", error });
  }
}

