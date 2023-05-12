import { json, Router } from "express";
import { GetProductsController, GetProductbyIDController, AddProductController, UpdateProductController, DeleteProductByIdController } from "../controllers/products.controller.js";

const productsRouter = Router()
productsRouter.use(json())

//Ruta para obtener productos//
productsRouter.get("/", GetProductsController);

//Ruta para obtener productos por ID//
productsRouter.get("/:pid", GetProductbyIDController);

//Ruta para Aagregar productos//
productsRouter.post("/", AddProductController);

//Ruta para actualizar productos//
productsRouter.put("/:pid", UpdateProductController)

//Ruta para eliminar productos por id//
productsRouter.delete("/:pid", DeleteProductByIdController)

export default productsRouter;

