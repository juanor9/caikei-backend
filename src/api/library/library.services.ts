import { DocumentDefinition, FilterQuery } from "mongoose";
import Library, {LibraryDocument} from "./library.model";

// Create a new library
export function createLibrary(library: DocumentDefinition<Omit<LibraryDocument, "createdAt" | "updatedAt">>){
  return Library.create(library);
}

// Edit a library
export function updateLibrary(id: string, library: DocumentDefinition<Omit<LibraryDocument, 'createdAt' | 'updatedAt'>> ){
  return Library.findByIdAndUpdate(id, library, {new: true});
}

// get all libraries by filter
export function getLibrariesFilter(filter: FilterQuery<LibraryDocument>){
  const libraries = Library.find(filter);
  return libraries;
}

// get library by id

export function getLibraryById(id: string){
  const library = Library.findById(id);
  return library;
}
