import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
export const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 }
},);

cartSchema.plugin(mongoosePaginate)
cartSchema.pre("find", function () {
    this.populate("products")
})

const cartModel = mongoose.model(cartCollection, cartSchema);
export default cartModel;