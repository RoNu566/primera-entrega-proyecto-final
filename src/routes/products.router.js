import { json, Router } from "express";
import ProductManager from "../productManager.js";


const productsRouter = Router()
productsRouter.use(json())

const manager = new ProductManager("./src/products.json")

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts()
    const { limit } = req.query

    if (limit) {
      const productsLimit = products.slice(0, limit)
      return res.send(productsLimit)
    }
    res.send(products)
  } catch (err) {
    res.status(404).send("No se pudo obtener la lista de productos")
  }
})

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = await manager.getProductById(parseInt(pid))
    res.status(201).send(product)
  } catch (err) {
    res.status(404).send("Producto no encontrado")
  }
})

productsRouter.post("/", async (req, res) => {
  const { title, description, price, thumbail = [], code, stock, status = true, category } = req.body;
  try {
    await manager.addProduct(title, description, parseInt(price), thumbail, parseInt(code), parseInt(stock), status, category);
    req.io.emit("new-product", req.body)
    res.status(201).send("Producto agregado")
  } catch (err) {
    res.status(404).send(" No se pudo cargar el producto")
  }
})

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const id = parseInt(pid)
    await manager.updateProduct(id, req.body)

    const products = await manager.getProducts()
    req.io.emit("update-product", products)
    res.status(201).send(await manager.getProductById(id))
  } catch (err) {
    res.status(404).send("No se pudo actualizar el producto")
  }
})

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const id = parseInt(pid)
    await manager.deleteProduct(id)

    const products = await manager.getProducts()
    req.io.emit("delete-product", products);
    res.status(201).send("Producto eliminado")
  } catch (err) {
    res.status(404).send("No se pudo eliminar el producto")
  }
})

export default productsRouter;
export { manager };
