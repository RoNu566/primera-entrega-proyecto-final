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
    const cart = await this.getCart();
    const prodCart = cart.find((x) => x.id == id);
    if (!prodCart) {
      return (`No se Encontró carrito con ese ID.`);
    } else {
      return prodCart;
    }
  }
  async addProductToCart(cid, product) {
    let carts = await this.getCart();
    let cartProd = await this.checkCart(cid);

    let producto = cartProd.products.find((prod) => prod.id == product.id)

    if (producto) {
      producto.quantity += 1;
      let ProductosEnCarrito = cartProd.products.find((prod) => prod.id !== producto.id)
      let CarritoActualizado = [...ProductosEnCarrito, producto];
      cartProd.products = CarritoActualizado;

      let othersCarts = carts.filter((cart) => cart.id !== cid) //busco los otros carritos que no tienen ese cartID
      othersCarts = [...othersCarts, cartProd]
      await fs.promises.writeFile(this.#path, JSON.stringify(othersCarts));
    } else {
      cartProd.products = [...cartProd.products, { id: product.id, quantity: 1 }]
      let othersCarts = carts.filter((cart) => cart.id !== cid) //bnsuco los carros cuyo id es distino al pasado por aprametro
      othersCarts = [...othersCarts, cartProd]
      await fs.promises.writeFile(this.#path, JSON.stringify(othersCarts));
    }
  }
}

export default CartManager;
