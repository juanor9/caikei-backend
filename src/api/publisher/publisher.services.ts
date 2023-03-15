import { DocumentDefinition, FilterQuery } from "mongoose";
import Publisher, { PublisherDocument } from "./publisher.model";

// Create a new publisher
export function createPublisher(
  publisher: DocumentDefinition<
    Omit<PublisherDocument, "createdAt" | "updatedAt">
  >
) {
  return Publisher.create(publisher);
}

// Get a publisher by its ID
export function getPublisherById(id: String) {
  return Publisher.findById(id);
}

// Get a publisher by filter
export async function getPublisherFilter(filter: FilterQuery<PublisherDocument>) {
  const publisher = Publisher.find(filter);
  return publisher;
}

// Update a publisher by its ID
export function updatePublisher(
  id: String,
  publisher: DocumentDefinition<
    Omit<PublisherDocument, "createdAt" | "updatedAt">
  >
) {
  return Publisher.findByIdAndUpdate(id, publisher, { new: true });
}
