import { Schema, model, Document } from "mongoose";

export interface PublisherDocument extends Document {
  name: string;
  publisherIds: object[];
  email: string;
  logo: string;
  address?: string;
  phone?: string;

  createdAt: Date;
  updatedAt: Date;

  isActive?: boolean;
}

const PublisherIdSchema = new Schema(
  {
    type: { type: String, required: true },
    number: { type: String, required: true },
  },
  { timestamps: true }
);

const PublisherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      capitalize: true,
    },
    publisherIds: [PublisherIdSchema],
    email: { type: String, required: true },
    logo: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,

    isActive: Boolean,
  },
  { timestamps: true }
);

const Publisher = model<PublisherDocument>("Publisher", PublisherSchema);

export default Publisher;
