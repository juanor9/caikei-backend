import { DocumentDefinition } from "mongoose";
import Publisher, { PublisherDocument } from "./publisher.model";

// Create a new publisher
export function createPublisher(publisher: DocumentDefinition<Omit<PublisherDocument, "createdAt" | "updatedAt">>){
    return Publisher.create(publisher);
}