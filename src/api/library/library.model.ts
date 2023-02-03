import { Schema, model, Document, Types } from "mongoose";

export interface LibraryDocument extends Document {
  name: string;
  libraryIds?: object[];
  email: string;
  city?: string;
  address?: string;
  phone?: string;
  publishers?: object[];

  createdAt: Date;
  updatedAt: Date;

  isActive?: boolean;
}

const LibraryIdSchema = new Schema(
  {
    type: { type: String, required: true },
    number: { type: String, required: true },
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
    publishers: [PublishersSchema]
  },
  { timestamps: true }
);

const Library = model<LibraryDocument>("Library", LibrarySchema);
export default Library;