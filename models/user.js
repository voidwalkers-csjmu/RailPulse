import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // later, use hashed passwords (bcrypt)
  role: { type: String, default: "user" }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
