import { DocumentDefinition } from "mongoose";
import Book, { BookDocument } from "./book.model";

// Create a new book

export function createBook(
  book: DocumentDefinition<Omit<BookDocument, "createdAt" | "updatedAt">>
) {
  return Book.create(book);
}
