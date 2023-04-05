import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartSchema = new mongoose.Schema({
    products: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 }
},);

cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model("carts", cartSchema);
export default cartModel;