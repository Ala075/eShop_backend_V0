import mongoose from "mongoose";
import validator from "validator";
import { hashData, InhashData } from "../helpers/hashData.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email address."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."],
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await hashData(this.password);
  next();
});

userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (user) {
      if (!user.password) {
        throw new Error("User has no password");
      }

      const auth = await InhashData(password, user.password);

      if (auth) {
        return user;
      } else {
        throw new Error("Incorrect password");
      }
    } else {
      throw new Error("Invalid email!");
    }
  } catch (error) {
    throw new Error(`Login error ${error.message}`);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
