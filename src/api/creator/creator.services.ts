import { DocumentDefinition, FilterQuery } from "mongoose";
import Creator, {CreatorDocument} from "./creator.model";

// create a new creator
export function createCreator(creator: DocumentDefinition<Omit<CreatorDocument, "createdAt" | "updatedAt">>) {
  return Creator.create(creator);
}