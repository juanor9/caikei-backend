import {DocumentDefinition, FilterQuery} from "mongoose";
import User, {UserDocument} from './user.model';

// Create user
export function createUser(user: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
    return User.create(user);
  }