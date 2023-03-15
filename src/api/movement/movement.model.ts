import { Schema, model, Document, Types } from "mongoose";

export interface MovementDocument extends Document {
  internalId: Number;
  date: Date;
  kind: string;
  from?: string;
  to?: string;
  books: Object[];
  discount?: Number;
  grossTotal?: Number;
  netTotal?: Number;
  createdBy: string;
}

const MovementSchema = new Schema(
  {
    internalId: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    kind: {
      type: String,
      required: true,
    },
    from: {
      type: [Types.ObjectId, String],
    },
    to: {
      type: [Types.ObjectId, String],
    },
    books: [
      {
        id: {
          type: Types.ObjectId,
          required: true,
        },
        copies: {
          type: Number,
          required: true,
        },
      },
    ],
    discount: Number,
    grossTotal: Number,
    netTotal: Number,
    createdBy: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movement = model<MovementDocument>("Movement", MovementSchema);
export default Movement;
