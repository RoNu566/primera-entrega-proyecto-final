import fs from "fs";

class CartManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async getCart() {
    try {
      const carts = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(carts);
    } catch (e) {
      return [];
    }
  }

  async addCart() {
    try {
      let carts = await this.getCart();
      const carrito = {
        id: carts.length,
        products: [],
      };
      carts = [...carts, carrito];
      await fs.promises.writeFile(this.#path, JSON.stringify(carts))
      return carts;
    } catch (e) {
      return "error";
    }
  }
  async checkCart(id) {
    let cart = await this.getCart();
    let prodCart = cart.find((x) => x.id == id);
    if (prodCart) {
      return prodCart;
    } else {
      throw new Error(`No se Encontró carrito con ese ID.`);
    }
  }
  async addProductToCart(cartID, product) {
    let cartProd = await this.checkCart(cartID);
    let producto = cartProd.products.find((x) => x.id == product.id);
    if (producto) {
      producto.quantity = producto.quantity + 1;
      return [cartProd];
    } else {
      const newProduct = {
        id: product.id,
        quantity: 1,
      };
      const newCart = cartProd.products.concat(newProduct);
      return newCart;
    }
  }
}

export default CartManager;
