import { FilterQuery, HydratedDocument } from "mongoose";
import Publisher, { PublisherDocument } from "./publisher.model";

// Create a new publisher
export function createPublisher(
  publisher: Omit<PublisherDocument, "createdAt" | "updatedAt">
): Promise<HydratedDocument<PublisherDocument>> {
  return Publisher.create(publisher);
}

// Get a publisher by its ID
export function getPublisherById(id: string) {
  return Publisher.findById(id);
}

// Get a publisher by filter
export async function getPublisherFilter(filter: FilterQuery<PublisherDocument>) {
  const publisher = Publisher.find(filter);
  return publisher;
}

// Update a publisher by its ID
export function updatePublisher(
  id: string,
  publisher: Omit<PublisherDocument, "createdAt" | "updatedAt">
) {
  return Publisher.findByIdAndUpdate(id, publisher, { new: true });
}
