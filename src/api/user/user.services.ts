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

// get user by id
export function getUserById(id: string) {
  return User.findById(id);
}

// Update user
export function updateUser(id: string, user: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
  return User.findByIdAndUpdate(id, user, {new: true});
}
