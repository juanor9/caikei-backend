import { DocumentDefinition, FilterQuery } from "mongoose";
import Book, { BookDocument } from "./book.model";

// Create a new book
export function createBook(
  book: DocumentDefinition<Omit<BookDocument, "createdAt" | "updatedAt">>
) {
  return Book.create(book);
}

// Get books by publisher (or any filter)
export function getBooksFilter(filter: FilterQuery<BookDocument>) {
  const books = Book.find(filter)
  return books;
}
