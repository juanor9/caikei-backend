import { DocumentDefinition, FilterQuery } from "mongoose";
import Plan, { PlanDocument } from "./plans.model";

// Get a plan by its ID
export function getPlanById(id: String) {
  return Plan.findById(id);
}