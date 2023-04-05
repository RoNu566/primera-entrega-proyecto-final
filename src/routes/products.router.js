import { json, Router } from "express";
import { ProductManager } from "../dao/index.js"


const productsRouter = Router()
productsRouter.use(json())

const manager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, page, sort } = req.params;
    const products = await manager.getProducts(limit, page, sort);
    res.send({ status: "success", payload: products });
  } catch (err) {
    res.status(404).send("No se pudo obtener la lista de productos")
  }
})

// productsRouter.get("/", async (req, res) => {
//   try {
//     const products = await manager.getProducts()
//     const { limit } = req.query

//     if (limit) {
//       const productsLimit = products.slice(0, limit)
//       return res.send(productsLimit)
//     }
//     res.send(products)
//   } catch (err) {
//     res.status(404).send("No se pudo obtener la lista de productos")
//   }
// })

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = await manager.getProductById(pid)
    res.status(201).send(product)
  } catch (err) {
    res.status(404).send("Producto no encontrado")
  }
})

productsRouter.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = Number(req.body.price);
    const thumbnail = req.body.thumbnail;
    const code = Number(req.body.code);
    const stock = Number(req.body.stock);
    const category = req.body.category;
    const status = true;

    const result = await manager.addProduct(title, description, price, thumbnail, code, stock, category, status);
    req.io.emit("new-product", result);
    res.status(201).send("Producto agregado!!");
  } catch (e) {
    res.status(404).send(`No se pudo agregar el producto`);
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const id = (pid);
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
    const id = pid
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
