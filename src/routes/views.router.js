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
    const data = req.session
    const { page } = req.query;
    const products = await productModel.paginate({}, { limit: 4, lean: true, page: page ?? 1 })
    res.render("products", { products, data })

});

viewsRouter.get("/chat", async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Err) {
        console.log("No se pudieron obtener los mensajes!")
    }
});

//Login//

viewsRouter.get("/login", async (req, res) => {
    console.log(req.session)
    const data = req.session;
    res.render("login", { data })
});

viewsRouter.get("/profile", async (req, res) => {
    const data = req.session;
    res.render("profile", { data })
});

viewsRouter.get("/signIn", async (req, res) => {
    res.render("signIn")
});

viewsRouter.get("/forgot", async (req, res) => {
    res.render("forgot")
});

export default viewsRouter;