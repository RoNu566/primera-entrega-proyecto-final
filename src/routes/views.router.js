import { json, Router } from "express";
import { HomeViewController, RealTimeProdController, ProductViewController, ChatController, LoginViewController, ProfileViewController, SignInViewController, ForgotViewController } from "../controllers/views.controller.js";
const viewsRouter = Router()
viewsRouter.use(json())

//Ruta Render Home//
viewsRouter.get("/", HomeViewController);

//Ruta Render Rreal Time Products//
viewsRouter.get("/real-time-products", RealTimeProdController);

//Ruta Render Product//
viewsRouter.get("/products", ProductViewController);

//Ruta Render Chat//
viewsRouter.get("/chat", ChatController);


//Ruta Render Login//
viewsRouter.get("/login", LoginViewController);

//Ruta Render Profile//
viewsRouter.get("/profile", ProfileViewController);

//Ruta Render Signin//
viewsRouter.get("/signIn", SignInViewController);

//Ruta Render Forgot//
viewsRouter.get("/forgot", ForgotViewController);

export default viewsRouter;