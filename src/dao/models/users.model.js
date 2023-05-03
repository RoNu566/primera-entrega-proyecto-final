import mongoose from "mongoose";
import { cartCollection } from "./cart.models.js";

const userCollection = "user"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    cart: { type: [{ cart: { type: mongoose.Schema.Types.ObjectId, ref: cartCollection } }], default: [], },
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;