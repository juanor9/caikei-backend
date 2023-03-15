import { Request, Response } from "express";
import {
  createLibrary,
  updateLibrary,
  getLibrariesFilter,
  getLibraryById
} from "./library.services";
import Library, { LibraryDocument } from "./library.model";

export async function handleCreateLibrary(req: Request, res: Response) {
  const newLibraryData = req.body;
  const { name, email, idKind, idNumber, city, address, phone, publisher, discount } =
    newLibraryData;
  const newLibrary = { name, email, city, address, phone };
  const libraryNewIds = {
    type: idKind,
    number: idNumber,
  };
  const publisherData = {
    publisherId : publisher,
    discount
  }

  try {
    const library = (await createLibrary(newLibrary)) as LibraryDocument;
    library.libraryIds && library.libraryIds.push(libraryNewIds);
    library.publishers && library.publishers.push(publisherData);

    await library.save();

    return res.status(200).json(library);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdateLibrary(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  try {
    const library = await updateLibrary(id, data);
    return res.status(200).json(library);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetLibrariesByFilter(req: Request, res: Response) {
  const filter = req.query;
  if (!filter) {
    return res.status(404).json({ message: "No filter provider" });
  }
  try {
    const libraries = await getLibrariesFilter(filter);

    return res.status(200).json(libraries);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetLibraryById(req: Request, res: Response) {
  const { id } = req.params;

  if(!id) {
    return res.status(404).json({ message: "Library not found"});
  }

  try {
    const library = await getLibraryById(id);

    return res.status(200).json(library);
    
  } catch (error) {
    return res.status(500).json(error);
  }
}
