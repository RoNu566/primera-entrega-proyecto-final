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
    } catch (error) {
      return [];
    }
  }

  async addCart() {
    try {
      let carts = await this.getCart();
      const carrito = {
        id: carts.length + 1,
        products: []
      }
      carts = [...carts, carrito];
      await fs.promises.writeFile(this.#path, JSON.stringify(carts))
    } catch (error) {
      return "error";
    }
  }
  async checkCart(id) {
    const carts = await this.getCart();
    const prodCart = carts.find((x) => x.id == id);
    if (!prodCart) {
      console.log("No se Encontró carrito con ese ID");
    } else {
      return prodCart;
    }
  }

  async addProductToCart(cid, product) {
    let carts = await this.getCart();
    let cart = await this.checkCart(cid);

    let producto = cart.products.find((prod) => prod.id == product.id)

    if (producto) {
      producto.quantity += 1;
      let ProductosEnCarrito = cart.products.find((prod) => prod.id !== producto.id)
      let CarritoActualizado = [...ProductosEnCarrito, producto];
      cart.products = CarritoActualizado;

      let othersCarts = carts.filter((cart) => cart.id !== cid) //busco los otros carritos que no tienen ese cartID
      othersCarts = [...othersCarts, cart]
      await fs.promises.writeFile(this.#path, JSON.stringify(othersCarts));
    } else {
      cart.products = [...cart.products, { id: product.id, quantity: 1 }]
      let othersCarts = carts.filter((cart) => cart.id !== cid) //bnsuco los carros cuyo id es distino al pasado por aprametro
      othersCarts = [...othersCarts, cart]
      await fs.promises.writeFile(this.#path, JSON.stringify(othersCarts));
    }
  }
}

export default CartManager;
