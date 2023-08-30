import { Schema, model, Document } from "mongoose";

export interface PlanDocument extends Document {
  plan: string;
  titles: number;
  cost: number;

  isActive?: boolean;
}

const PlanSchema = new Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    titles: Number,
    cost: Number,

    isActive: Boolean,
  },
  { timestamps: true }
);

const Plan = model<PlanDocument>("Plan", PlanSchema);

export default Plan;