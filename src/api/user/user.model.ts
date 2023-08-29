import { Schema, model, Document, Types } from "mongoose";
import { userProfileType } from "./user.types";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  role: "PUBLISHER" | "ADMIN";
  email: string;
  password: string;
  publisher?: string;
  plan: string;

  createdAt: Date;
  updatedAt: Date;

  profile: userProfileType;
  comparePassword: (password: string) => Promise<boolean>;

  isActive?: Boolean;
}

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["PUBLISHER", "ADMIN"],
      default: "PUBLISHER",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isActive: Boolean,
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    publisher: String,
    plan: {
      type: Types.ObjectId,
      require: true,
      default: '64e9fe7b113098ca3a9045f5',
    },
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
UserSchema.virtual("profile").get(function profile() {
  const { _id, role, email, publisher, plan } = this;

  return {
    _id,
    role,
    email,
    publisher,
    plan,
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
