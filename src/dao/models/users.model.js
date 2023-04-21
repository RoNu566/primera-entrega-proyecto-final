import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: "user" }
});

const usersModel = mongoose.model("users", userSchema);

export default usersModel;