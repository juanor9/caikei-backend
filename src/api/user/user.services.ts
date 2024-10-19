import { FilterQuery } from "mongoose";
import User, { UserDocument } from "./user.model";
import { HydratedDocument } from "mongoose"; // Importar el tipo adecuado

// Create user
export function createUser(
  user: Omit<UserDocument, "createdAt" | "updatedAt">
): Promise<HydratedDocument<UserDocument>> {
  return User.create(user);
}

// Get user by filter
export function getUserFilter(filter: FilterQuery<UserDocument>) {
  console.log("🚀 ~ getUserFilter ~ filter:", filter)
  const user = User.findOne(filter);
  return user;
}

// Get user by id
export function getUserById(id: string) {
  return User.findById(id).populate("publisher");
}

// Update user
export function updateUser(
  id: string,
  user: Omit<UserDocument, "createdAt" | "updatedAt">
) {
  return User.findByIdAndUpdate(id, user, { new: true });
}
