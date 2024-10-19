import { Request, Response } from "express";
import {
  createBook,
  getBooksFilter,
  updateBook,
  getBookById,
} from "./book.services";

export async function handleCreateBook(req: Request, res: Response): Promise<void> {
  const newBook = req.body;

  try {
    // Activar el libro
    newBook.isActive = true;

    // Crear el libro y esperar el resultado
    const book = await createBook(newBook);

    // Enviar la respuesta con el libro creado
    res.status(200).json(book);
  } catch (error) {
    // Verificación para asegurarnos de que el error es una instancia de Error
    if (error instanceof Error) {
      // Manejar errores y enviar una respuesta con código de estado 500
      res.status(500).json({ error: error.message });
    } else {
      // Manejar otro tipo de errores que no sean instancias de Error
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}



export async function handleGetBooksByFilter(req: Request, res: Response): Promise<void> {
  const filter = req.query;

  // Verifica si el filtro tiene alguna propiedad
  if (Object.keys(filter).length === 0) {
    res.status(400).json({ message: "No filter provided" });
    return; // Asegúrate de que la función termine aquí
  }

  try {
    const books = await getBooksFilter(filter);

    res.status(200).json(books);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}



export async function handleGetBookById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "Book not found" });
    return; // Asegúrate de que la función termine aquí
  }

  try {
    const book = await getBookById(id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}


export async function handleUpdateBook(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const data = req.body;

  try {
    const book = await updateBook(id, data);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return; // Asegúrate de que la ejecución se detenga aquí
    }

    res.status(200).json(book);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}

