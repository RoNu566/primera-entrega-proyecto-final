import { Router, json } from "express";
import { GetCartController, CreateCartController, GetCartByIdController, AddProductToCartController, DeleteProductFromCartController, DeleteCartController } from "../controllers/cart.controller.js";


const cartRouter = Router();
cartRouter.use(json())

//Ruta para obtener Carritos//
cartRouter.get("/", GetCartController);

//Ruta para crear Carritos//
cartRouter.post("/", CreateCartController);

//Ruta para obtener Carritos por ID//
cartRouter.get("/:cid", GetCartByIdController);

//Ruta para agregar producto al Carritos//
cartRouter.post("/:cid/product/:pid", AddProductToCartController);

//Ruta para eliminar producto del carrito//
cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

//Ruta para eliminar Carritos//
cartRouter.delete("/:cid", DeleteCartController)


export default cartRouter;