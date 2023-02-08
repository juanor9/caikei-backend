import { Request, Response } from "express";
import { Types } from "mongoose";
import { createMovement } from "./movement.services";
import { getBookById } from "../book/book.services";

export async function HandleCreateMovement(req: Request, res: Response) {
  const newMovement = req.body;
  interface inventoryDocument {
    placeId: Types.ObjectId;
    copies: number;
  }
  const { kind, books, publisher } = newMovement;

  // Set actions when movement is 'ingreso'
  if (kind === "ingreso") {
    books.map(async (book: { id: string; copies: number }) => {
      const { id, copies } = book;
      try {
        // Get books in the movement from database
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          return res.status(404).json({ message: "Book not found" });
        }

        // Get book inventory
        const inventory = bookToMod.inventory as inventoryDocument[];

        // if nothing in inventory, add it directly
        if (inventory && inventory.length === 0) {
          bookToMod.inventory = bookToMod.inventory?.concat({
            placeId: publisher,
            copies,
          });
          bookToMod.save();
          return bookToMod;
        }
        // if items in inventory, check publisher's copies and add copies from movement
        if (inventory && inventory.length > 0) {
          const test = inventory.map((i) => {
            const placeid = i.placeId.toString();
            if (placeid === publisher) {
              const previousCopies = i.copies;
              const copiesToAdd = Number(copies);
              const newCopies = previousCopies + copiesToAdd;
              const storage = inventory.find((i) => placeid === publisher);
              if (!storage) {
                return;
              }
              storage.copies = newCopies;
              bookToMod.save();
            }
          });
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    });
  }

  try {
    const movement = await createMovement(newMovement);

    return res.status(200).json(movement);
  } catch (error) {
    return res.status(500).json(error);
  }
}
