import { manager } from "../controllers/products.controller.js"
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js";

const chatManager = new ChatManager;

export const HomeViewController = async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", { products })
}

export const RealTimeProdController = async (req, res) => {
    const products = await manager.getProducts()
    res.render("real-time-products", { products })
}

export const ProductViewController = async (req, res) => {
    const data = req.session
    const { page } = req.query;
    const products = await productModel.paginate({}, { limit: 4, lean: true, page: page ?? 1 })
    res.render("products", { products, data })
}

export const ChatController = async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Err) {
        console.log("No se pudieron obtener los mensajes!")
    }
}

export const LoginViewController = async (req, res) => {
    console.log(req.session)
    const data = req.session;
    res.render("login", { data })
}

export const ProfileViewController = async (req, res) => {
    const data = req.session;
    res.render("profile", { data })
}

export const SignInViewController = async (req, res) => {
    res.render("signIn")
}

export const ForgotViewController = async (req, res) => {
    res.render("forgot")
}