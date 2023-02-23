import { Schema, model, Document, Types } from "mongoose";

export interface CreatorDocument extends Document {
  name: string;
  surname: string;
  gender?: "masculino" | "femenino" | "otros";
  kind: "escritor" | "ilustrador" | "traductor" | "antologista";
  picture?: string;
  biography?: string;
  awards?: string;

  isActive?: boolean

  createdAt: Date;
  updatedAt: Date;
}

const CreatorSchema = new Schema(
  {
    name:{
      type: String,
      required: true,
    },
    surname:{
      type: String,
      required: true,
    },
    gender:{
      type: String,
      enum: ["masculino", "femenino", "otros"],
    },
    kind:{
      type: String,
      enum:["escritor", "ilustrador", "traductor", "antologista"],
      required: true,
    },
    picture:String,
    biography: String,
    awards:String,

    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

const Creator = model<CreatorDocument>("Creator", CreatorSchema);

export default Creator;