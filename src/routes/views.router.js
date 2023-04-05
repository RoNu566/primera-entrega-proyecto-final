import { json, Router } from "express";
import { manager } from "./products.router.js";
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js";


const viewsRouter = Router()
viewsRouter.use(json())

const chatManager = new ChatManager;

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", { products })
});

viewsRouter.get("/real-time-products", async (req, res) => {
    const products = await manager.getProducts()
    res.render("real-time-products", { products })

});

viewsRouter.get("/products", async (req, res) => {
    const { page } = req.query;
    const products = await productModel.paginate({}, { limit: 4, lean: true, page: page ?? 1 })
    res.render("products", { products })

});

viewsRouter.get("/chat", async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Err) {
        console.log("No se pudieron obtener los mensajes!")
    }
})

export default viewsRouter