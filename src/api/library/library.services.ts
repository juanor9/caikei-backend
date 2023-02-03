import { DocumentDefinition, FilterQuery } from "mongoose";
import Library, {LibraryDocument} from "./library.model";

// Create a new library
export function createLibrary(library: DocumentDefinition<Omit<LibraryDocument, "createdAt" | "updatedAt">>){
  return Library.create(library);
}