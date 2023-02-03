import { Request, Response } from "express";
import {
  createBook,
  getBooksFilter,
  updateBook,
  getBookById,
} from "./book.services";

export async function handleCreateBook(req: Request, res: Response) {
  const newBook = req.body;

  try {
    // activate book
    newBook.isActive = true;

    const book = createBook(newBook);

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetBooksByFilter(req: Request, res: Response) {
  const filter = req.params;
  if (!filter) {
    return res.status(404).json({ message: "No filter provided" });
  }

  try {
    const books = await getBooksFilter(filter);

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleGetBookById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Book not found" });
  }

  try {
    const book = await getBookById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function handleUpdateBook(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  try {
    const book = await updateBook(id, data);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json(error);
  }
}
