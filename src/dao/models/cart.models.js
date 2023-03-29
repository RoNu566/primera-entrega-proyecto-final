import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: { type: Array, default: [] }
},);
const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;