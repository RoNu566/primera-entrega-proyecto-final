import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: { type: String, requiered: true },
    description: { type: String, requiered: true },
    price: { type: Number, requiered: true },
    thumbnail: { type: Array, default: [] },
    code: { type: Number, requiered: true },
    stock: { type: Number, requiered: true },
    category: { type: String, requiered: true },
    status: { type: Boolean, default: true },

});

const productModel = mongoose.model("products", productSchema);
export default productModel;