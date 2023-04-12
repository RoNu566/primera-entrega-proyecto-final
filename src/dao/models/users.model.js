import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String }
});

const usersModel = mongoose.model("users", userSchema);

export default usersModel;