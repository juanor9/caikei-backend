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
  book_binding?:
    | "rústica"
    | "tapa dura"
    | "grapa"
    | "plegado/fanzine"
    | "otros";
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
    book_binding: {
      type: String,
      enum: ["rústica", "tapa dura", "grapa", "plegado/fanzine", "otros"],
      default: "rústica",
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
      validate: {
        validator: (value: string) => /^#[0-9A-F]{6}$/i.test(value),
        message: "{VALUE} no es un color válido en formato hexadecimal",
      },
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
