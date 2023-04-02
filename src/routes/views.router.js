import { json, Router } from "express";
import { manager } from "./products.router.js";
import ChatManager from "../dao/db-managers/chat.manager.js";


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

viewsRouter.get("/chat", async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Err) {
        console.log("No se pudieron obtener los mensajes!")
    }
})

export default viewsRouter