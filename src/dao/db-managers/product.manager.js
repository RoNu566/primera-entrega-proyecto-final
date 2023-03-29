import productModel from "../models/products.models.js";
import cartModel from "../models/cart.models.js";

class ProductManager {


  constructor() {
    console.log("Working on DB")
  }

  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const aux = await productModel.findById(id);
    if (!aux) {
      console.log("Producto no encontrado");
    } else {
      return aux;
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {
    const product = { title, description, price, thumbnail, code, stock, category, status }
    const result = await productModel.create(product);
    console.log("Producto Agregado!")
    return result;
  }

  async updateProduct(id, info) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate({ _id: id }, info);
      return updatedProduct;
    } catch (Error) {
      console.log("No se pudo actualizar el producto")
      throw new Error;
    }
  }

  async deleteProduct(id) {
    try {
      const result = await productModel.deleteOne({ _id: id });
      return result
    } catch (Error) {
      console.log("No se ha podido eliminar el producto")
      throw new Error;
    }
  }
}

export default ProductManager;
