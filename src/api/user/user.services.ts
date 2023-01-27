import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "./user.model";

// Create user
export function createUser(
  user: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt">>
) {
  return User.create(user);
}

// Get user by filter
export function getUserFilter(filter: FilterQuery<UserDocument>) {
  const user = User.findOne(filter);
  return user;
}
