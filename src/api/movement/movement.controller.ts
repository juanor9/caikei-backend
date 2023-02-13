import { Request, Response } from "express";
import { Types } from "mongoose";
import { createMovement, getMovementsByPublisher } from "./movement.services";
import { getBookById } from "../book/book.services";

export async function HandleCreateMovement(req: Request, res: Response) {
  const newMovement = req.body;
  interface inventoryDocument {
    placeId: Types.ObjectId;
    copies: number;
  }
  const { kind, books, publisher } = newMovement;

  try {
    // Set actions when movement is 'ingreso'
    if (kind === "ingreso") {
      books.map(async (book: { id: string; copies: number }) => {
        const { id, copies } = book;

        // Get books in the movement from database
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          return;
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
          return;
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
      });
    }
    // Set actions when movement is 'remisión'
    if (kind === "remisión" || kind === "devolución") {
      const { from, to } = newMovement;
      books.map(async (book: { id: string; copies: number }) => {
        const { id, copies } = book;
        // Get books in the movement from database
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          return;
        }

        // Get book inventory
        const inventory = bookToMod.inventory as inventoryDocument[];

        // get books from storage
        if (inventory && inventory.length > 0) {
          const fromStorage = inventory.find(
            (i) => i.placeId.toString() === from
          );
          if (!fromStorage) {
            return;
          }
          const copiesAvailable = fromStorage.copies;
          const copiesRequested = copies;
          if (copiesRequested > copiesAvailable) {
            return;
          }
          fromStorage.copies =
            Number(copiesAvailable) - Number(copiesRequested);
        }
        // get books to storage
        if (inventory && inventory.length > 0) {
          const toStorage = inventory.find((i) => i.placeId.toString() === to);
          // if storage has not the book, add it directly
          if (!toStorage) {
            bookToMod.inventory = bookToMod.inventory?.concat({
              placeId: to,
              copies,
            });

            bookToMod.save();
            return;
          }
          // if storage has the book, sum it
          if (toStorage) {
            const copiesInStorage = toStorage.copies;
            const newTotalCopies = Number(copiesInStorage) + Number(copies);
            toStorage.copies = newTotalCopies;

            bookToMod.save();
            return;
          }
          
        }
      });
    }
    // Set actions when movement is 'liquidación'
    if (kind === "liquidación") {
      const { from, to } = newMovement;
      books.map(async (book: { id: string; copies: number }) => {
        const { id, copies } = book;
        // Get books in the movement from database
        const bookToMod = await getBookById(id);
        if (!bookToMod) {
          return;
        }

        // Get book inventory
        const inventory = bookToMod.inventory as inventoryDocument[];

        // get books from storage
        if (inventory && inventory.length > 0) {
          const fromStorage = inventory.find(
            (i) => i.placeId.toString() === from
          );
          if (!fromStorage) {
            return;
          }
          const copiesAvailable = fromStorage.copies;
          const copiesRequested = copies;
          if (copiesRequested > copiesAvailable) {
            return;
          }
          fromStorage.copies =
            Number(copiesAvailable) - Number(copiesRequested);
            bookToMod.save();
        }
      });
    }

    const movement = await createMovement(newMovement);

    return res.status(200).json(movement);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function HandleGetMovementsByPublisher(
  req: Request,
  res: Response
){
  
  const filter = req.query;
  if(!filter){
    return res.status(404).json({message: "no filter provided"})
  }
  try {
    const movements = await getMovementsByPublisher(filter);

    return res.status(200).json(movements)
    
  } catch (error) {
    return res.status(500).json(error)
  }

}