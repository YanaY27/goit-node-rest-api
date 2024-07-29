import mongoose from "mongoose";
import gravatar from "gravatar";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: "250", d: "identicon" });
    },
  },
});

const User = model("user", userSchema);

export default User;
