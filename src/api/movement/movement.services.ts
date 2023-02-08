import { DocumentDefinition } from "mongoose";
import Movement, { MovementDocument } from "./movement.model";

// Create a new movement
export function createMovement(
  movement: DocumentDefinition<
    Omit<MovementDocument, "createdAt" | "updatedAt">
  >
) {
  return Movement.create(movement);
}
