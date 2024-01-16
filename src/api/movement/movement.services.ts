import { DocumentDefinition, FilterQuery } from "mongoose";
import Movement, { MovementDocument } from "./movement.model";

// Create a new movement
export function createMovement(
  movement: DocumentDefinition<
    Omit<MovementDocument, "createdAt" | "updatedAt">
  >
) {
  return Movement.create(movement);
}

//get movements by publisher
 export function getMovementsByPublisher(filter: FilterQuery<MovementDocument>){
  const movements = Movement.find(filter);
  return movements;
 }

 // Get movement by id
 export function getMovementById(id:string){
  const movement = Movement.findById(id);
  return movement;
 }

 // remove movement by id
 export function deleteMovementById(id:string){
  console.log("Deleting movement with ID:", id);
  const movement = Movement.findByIdAndDelete(id);
  return movement;
 }