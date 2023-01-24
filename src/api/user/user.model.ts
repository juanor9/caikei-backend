import { Schema, model, Document } from "mongoose";
import { userProfileType } from "./user.types";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: "USER" | "ADMIN";
  username: string;
  email: string;
  password: string;
  publishingHouses?: string[];

  createdAt: Date;
  updatedAt: Date;

  profile: userProfileType;
  comparePassword: (password: string) => Promise<boolean>;

  emailConfirmToken?: String,
  emailConfirmExpires?: Date,
  isActive?:Boolean,

  passwordResetToken?: String,
  passwordResetExpires?: Date,
}

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    emailConfirmToken: String,
    emailConfirmExpires : Date,
    isActive:Boolean,
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    publishingHouses: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

//Middlewares
UserSchema.pre("save", async function save(next: Function) {
  const user = this as UserDocument;

  try {
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

// Virtuals
UserSchema.virtual('profile').get(function profile() {
  const {_id, username, role, email} = this;

  return {
    _id, username, role, email
  };

});

//Methods
async function comparePassword(
  this: UserDocument,
  candidatePassword: string,
  next: Function
): Promise<boolean> {
  const user = this;

  try {
    console.log(candidatePassword, user.password);
    const match = await bcrypt.compare(candidatePassword, user.password);

    return match;
  } catch (error: any) {
    next(error);
    return false;
  }
}

UserSchema.methods.comparePassword = comparePassword;

const User = model<UserDocument>("User", UserSchema);

export default User;
