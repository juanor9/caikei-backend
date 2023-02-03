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
  const books = Book.find(filter);
  return books;
}

// get book by id
export function getBookById(id: string){
  const book = Book.findById(id);
  return book;
}

// Edit a book
export function updateBook(
  id: string,
  book: DocumentDefinition<Omit<BookDocument, "createdAt" | "updatedAt">>
) {
  return Book.findByIdAndUpdate(id, book, { new: true });
}
