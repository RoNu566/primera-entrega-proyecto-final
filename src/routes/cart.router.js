import { Router, json } from "express";
import CartManager from "../cartManager.js"
import { manager } from "./products.router.js";

const cartRouter = Router();
cartRouter.use(json())

const cartManager = new CartManager("./src/cart.json");


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
  if (!carrito) {
    res.send("Este carrito no existe")
  } else {
    res.send(carrito);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const IdProd = parseInt(pid);
  const IdCart = parseInt(cid);
  try {
    let product = await manager.getProductById(IdProd);
    await cartManager.addProductToCart(IdCart, product);
    res.status(201).send(`Producto ${IdProd} agregado al carrito ${IdCart}`);
  } catch (error) {
    res.status(404).send("No se pudo agregar producto al carrito")
  }
});

export default cartRouter;