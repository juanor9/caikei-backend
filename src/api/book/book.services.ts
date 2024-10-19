import { HydratedDocument, FilterQuery } from "mongoose";
import Book, { BookDocument } from "./book.model";
import Library from "../bookshop/bookshop.model";

// Create a new book
export function createBook(
  book: Omit<BookDocument, "createdAt" | "updatedAt">
) {
  return Book.create(book);
}

// Get books by publisher (or any filter)
export function getBooksFilter(filter: FilterQuery<BookDocument>) {
  return Book.find(filter);
}

// Get book by id
export function getBookById(id: string) {
  return Book.findById(id);
}

// Edit a book
export function updateBook(
  id: string,
  book: Omit<BookDocument, "createdAt" | "updatedAt">
) {
  return Book.findByIdAndUpdate(id, book, { new: true });
}
