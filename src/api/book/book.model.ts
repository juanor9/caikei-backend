import { Schema, model, Document, Types } from "mongoose";

export interface BookDocument extends Document {
  title: string;
  isbn?: string;
  cover?: string;
  price: number;
  pubDate: Date;
  authors: string;
  thema?: string;
  topics?: string;
  binding?:string;
  pages: number;
  height?: number;
  width?: number;
  awards?: string;
  color?: string;
  costCenter?: string;
  publisher: string;

  createdAt: Date;
  updatedAt: Date;

  isActive?: Boolean;
  inventory? : object[]
  
}

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
    },
    cover: String,
    publisher:{
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    pubDate: {
      type: Date,
      required: true,
    },
    authors: String,
    thema: String,
    topics: String,
    binding: {
      type: String,
    },
    pages: {
      type: Number,
      required: true,
    },
    height: Number,
    width: Number,
    awards: String,
    color: {
      type: String,
    },
    costCenter: String,

    isActive: Boolean,

    inventory: [{
      placeId: Types.ObjectId,
      copies: Number
    }]
  },
  {
    timestamps: true,
  }
);

const Book = model<BookDocument>("Book", BookSchema);

export default Book;
