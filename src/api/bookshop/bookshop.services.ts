import { FilterQuery } from "mongoose";
import Bookshop, { BookshopDocument } from "./bookshop.model";
import { Types } from "mongoose";


type NewBookshopData = {
  name: string;
  email: string;
  city?: string;
  address?: string;
  phone?: string;
  bookshopIds?: { idKind: string; idCode: number }[];
  publishers?: { publisherId: Types.ObjectId; discount: number }[];
  discount?: number;
};

// Crear una nueva biblioteca
export function createBookshop(bookshop: NewBookshopData) {
  return Bookshop.create(bookshop);
}

// Editar una biblioteca
export function updateBookshop(id: string, bookshop: Partial<NewBookshopData>) {
  return Bookshop.findByIdAndUpdate(id, bookshop, { new: true }).exec();
}

// Obtener bibliotecas por filtro
export function getBookshopsFilter(filter: FilterQuery<BookshopDocument>) {
  return Bookshop.find(filter).exec();
}

// Obtener una biblioteca por ID
export function getBookshopById(id: string) {
  return Bookshop.findById(id).exec();
}
