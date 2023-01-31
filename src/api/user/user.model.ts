import { Schema, model, Document } from "mongoose";
import { userProfileType } from "./user.types";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: "USER" | "ADMIN";
  email: string;
  password: string;
  publisher?: string;

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
    publisher:String,
  },
  {
    timestamps: true,
  }
);

//Middlewares
UserSchema.pre("save", async function save(next: Function) {
  console.log('in user.save');
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
  const {_id, role, email, publisher} = this;

  return {
    _id, role, email, publisher
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
