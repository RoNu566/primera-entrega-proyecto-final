import { Router, json } from "express";
import { CartManager } from "../dao/index.js"
import { manager } from "./products.router.js";

const cartRouter = Router();
cartRouter.use(json())

const cartManager = new CartManager();


cartRouter.get("/", async (req, res) => {
  let carrito = await cartManager.getCart();
  res.send(carrito);
});

cartRouter.post("/", async (req, res) => {
  let carrito = await cartManager.addCart();
  res.send(carrito);
});

cartRouter.get("/:cid", async (req, res) => {
  let cid = req.params.cid;
  let carrito = await cartManager.checkCart(cid);
  if (!carrito) {
    res.send("Este carrito no existe")
  } else {
    res.send(carrito);
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const IdProd = pid;
  const IdCart = cid;
  try {
    let product = await manager.getProductById(IdProd);
    await cartManager.addProductToCart(IdCart, product);
    res.status(201).send(`Producto ${IdProd} agregado al carrito ${IdCart}`);
  } catch (error) {
    res.status(404).send("No se pudo agregar producto al carrito")
  }
});


cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartManager.deletProdfromCart(cid, pid);
    res.send({ status: "success", payload: "Seelimino el producto del carrito" })
  } catch (err) {
    res.send({ status: "failed", payload: "No se pudo eliminar el producto del carrito" })
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await cartManager.deleteCar(cid);
    res.send({ status: "Success", payload: "Se elimino el carrito" })
  } catch (err) {
    res.send({ status: "Failed", payload: "No se ha eliminado el carrito" })
  }

})


export default cartRouter;