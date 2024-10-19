import { Schema, model, Document, Types } from "mongoose";

export interface BookshopDocument extends Document {
  name: string;
  bookshopIds?: { idKind: string; idCode: number }[];
  email: string;
  city?: string;
  address?: string;
  phone?: string;
  publishers?: { publisherId: Types.ObjectId; discount: number }[];
  discount?: number;

  createdAt: Date;
  updatedAt: Date;

  isActive?: boolean;
}

const BookshopIdSchema = new Schema(
  {
    idKind: { type: String, required: true },
    idCode: { type: Number, required: true },
  },
  { _id: false }
);

const PublishersSchema = new Schema(
  { 
    publisherId: { type: Types.ObjectId, required: true, ref: 'Publisher' },
    discount: { type: Number, required: true, min: 0, max: 100 }
  },
  { _id: false }
);

const BookshopSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    bookshopIds: [BookshopIdSchema],
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/, trim: true },
    city: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, match: /^\+?[0-9\-\s]+$/, trim: true },
    publishers: [PublishersSchema],
    discount: { type: Number, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Bookshop = model<BookshopDocument>("Bookshop", BookshopSchema);
export default Bookshop;
