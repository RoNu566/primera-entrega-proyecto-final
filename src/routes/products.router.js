import { Router, json } from "express";
import ProductManager from "../productManager.js";

const productsRouter = Router();
let manager = new ProductManager("./src/products.json");
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let num = parseInt(req.params.pid);
  const products = await manager.getProductById(num);
  res.send(products);
});

productsRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail = [], code, stock, category, status = true } = req.body;
    await manager.addProduct(title, description, parseInt(price), thumbnail, code, parseInt(stock), category, status);
    res.send(req.body);
  } catch (error) {
    res.status(404).send("Error al cargar el producto")
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);
  await manager.updateProduct(id, req.body)

  res.send({ status: "success", payload: await manager.getProductById(id) })
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const deleteProduct = await manager.deleteProduct(pid);
  res.send(deleteProduct);
});
export default productsRouter;
