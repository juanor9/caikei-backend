import { Request, Response } from "express";
import {
  createBookshop,
  updateBookshop,
  getBookshopsFilter,
  getBookshopById,
} from "./bookshop.services";
import { BookshopDocument } from "./bookshop.model";
import { Types } from "mongoose";
import sanitize from "mongo-sanitize";


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

export async function handleCreateBookshop(
  { body: { name, email, idKind, idNumber, city, address, phone, publisher, discount } }: Request,
  res: Response
): Promise<void> {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!name || !email || !emailRegex.test(email)) {
    res.status(400).json({ error: "Name and a valid email are required" });
    return;
  }

  const newBookshop: NewBookshopData = {
    name,
    email,
    city,
    address,
    phone,
    bookshopIds: [],
    publishers: [],
    discount: discount || 0,
  };

  if (idKind && idNumber) {
    newBookshop.bookshopIds?.push({ idKind, idCode: idNumber });
  }

  if (publisher) {
    newBookshop.publishers?.push({ publisherId: publisher, discount: discount || 0 });
  }

  try {
    const bookshop = await createBookshop(newBookshop) as BookshopDocument;
    res.status(200).json(bookshop);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}


export async function handleUpdateBookshop(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const data = req.body;

  const validFields: Partial<BookshopDocument> = {
    name: data.name,
    email: data.email,
    city: data.city,
    address: data.address,
    phone: data.phone,
    discount: data.discount,
    publishers: data.publishers,
    bookshopIds: data.bookshopIds,
  };

  const sanitizedData = sanitize(validFields);

  try {
    const updatedBookshop = await updateBookshop(id, sanitizedData);

    if (!updatedBookshop) {
      res.status(404).json({ error: "Bookshop not found" });
      return;
    }

    res.status(200).json(updatedBookshop);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}


export async function handleGetBookshopsByFilter(req: Request, res: Response): Promise<void> {
  let filter = sanitize(req.query);

  if (Object.keys(filter).length === 0) {
    res.status(400).json({ message: "No filter provided. Please provide at least one filter parameter such as 'city', 'name', or 'email'." });
    return;
  }

  try {
    const bookshops = await getBookshopsFilter(filter);
    res.status(200).json(bookshops);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}


export async function handleGetBookshopById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const bookshop = await getBookshopById(id);

    if (!bookshop) {
      res.status(404).json({ message: "Bookshop not found" });
      return;
    }

    res.status(200).json(bookshop);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
}