import cartModel from "../models/cart.models.js";

class CartManager {

  constructor() {
    console.log("Working on DB")
  }

  async getCart() {
    try {
      const carts = await cartModel.find().lean();
      return carts
    } catch (error) {
      return [];
    }
  }

  async addCart(products) {
    try {
      const newCart = { products: [] }
      const result = await cartModel.create(newCart)
      return result
    } catch (error) {
      console.log("No se ha creado el carrito")
    }
  }
  async checkCart(id) {
    const cart = await cartModel.findById(id);
    if (!cart) {
      console.log("No se encontro el carrito")
    } else {
      return cart;
    }
  }

  async addProductToCart(cid, product) {
    try {
      const cart = await cartModel.findById(cid);
      const prod = cart.products.find(arr => arr._id == product._id)
      if (prod) {
        prod.quantity++;
        await cart.save();
      } else {
        cart.products.push({ IdProduct: product._id, quantity: 1 })
        await cart.save()
      }
    } catch (error) {
      throw new Error;
    }

  }


}

export default CartManager;
