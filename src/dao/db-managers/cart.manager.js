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
        await cart.populate("products.product").lean()
      } else {
        cart.products.push({ IdProduct: product._id, quantity: 1 })
        await cart.save()
        await await cart.populate("products.product").lean()
      }
    } catch (error) {
      throw new Error;
    }

  }

  async deleteCar(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("No existe el carrito")
    } else {
      cartModel.deleteOne(cid);
      return ("Se ha eliminado el carrito correctamente")
    }
  }

  async deletProdfromCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      const prod = cart.products.find(p => p.id === pid)

      if (!prod) {
        throw new Error("El producto buscado no se encuentra en ningún carrito")
      } else if (prod.quantity > 1) {
        prod.quantity -= 1;
        cart.save();
      } else {
        let newCartProd = cart.products.find(p => p.id !== pid);
        cart.products = newCartProd;
        cart.savr();
      }
    } catch (Error) {
      return (Error);
    }
  }
};

export default CartManager;
