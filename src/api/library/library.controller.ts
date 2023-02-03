import { Request, Response } from "express";
import { createLibrary } from "./library.services";
import Library, {LibraryDocument} from "./library.model";


export async function handleCreateLibrary(req: Request, res: Response) {
  const newLibraryData = req.body;
  const { name, email, idKind, idNumber, city, address, phone, publisher } =
    newLibraryData;
  const newLibrary = { name, email, city, address, phone }
  const libraryNewIds = {
    type: idKind,
    number: idNumber,
  }

  try {
    const library = await createLibrary(newLibrary) as LibraryDocument;
    library.libraryIds && library.libraryIds.push(libraryNewIds);
    library.publishers && library.publishers.push(publisher);

    await library.save()

    return res.status(200).json(library);
  } catch (error) {
    return res.status(500).json(error);
  }
}
