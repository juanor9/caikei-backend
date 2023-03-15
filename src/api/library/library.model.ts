import { Schema, model, Document, Types } from "mongoose";

export interface LibraryDocument extends Document {
  name: string;
  libraryIds?: object[];
  email: string;
  city?: string;
  address?: string;
  phone?: string;
  publishers?: Object[];
  discount?: number;

  createdAt: Date;
  updatedAt: Date;

  isActive?: boolean;
}

const LibraryIdSchema = new Schema(
  {
    type: { type: String},
    number: { type: String},
  },
  { timestamps: true }
);

const PublishersSchema = new Schema(
  { publisherId: Types.ObjectId, 
    discount: Number }
  );

const LibrarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    libraryIds: [LibraryIdSchema],
    email: { type: String, required: true },
    city: String,
    address: String,
    phone: String,
    publishers: [PublishersSchema],
    discount: Number,
  },
  { timestamps: true }
);

const Library = model<LibraryDocument>("Library", LibrarySchema);
export default Library;