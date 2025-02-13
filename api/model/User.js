import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("users", userSchema);

export default User;
