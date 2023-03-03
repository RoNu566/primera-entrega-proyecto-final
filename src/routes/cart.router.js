import { Router, json } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const cartRouter = Router();
let cartManager = new CartManager("./src/cart.json");
let productManager = new ProductManager("./products.json");
cartRouter.use(json());

cartRouter.get("/", async (req, res) => {
  let carrito = await cartManager.getCart();
  res.send(carrito);
});

cartRouter.post("/", async (req, res) => {
  let carrito = await cartManager.addCart();
  res.send(carrito);
});

cartRouter.get("/:cid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let carrito = await cartManager.checkCart(cid);
  res.send(carrito);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);
  let product = await productManager.getProductById(pid);
  let carrito = await cartManager.addProductToCart(cid, product);
  res.send(carrito);
});

export default cartRouter;
