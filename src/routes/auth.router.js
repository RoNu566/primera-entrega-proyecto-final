import { Router, json, urlencoded } from "express";
import { PassportSignUpController, SignupRedirectController, FailureSignupController, GithubAuthController, GithubCallbackController, GithubCallbackRedirectController, LoginController, CurrentController, LogoutController, ForgotController } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));


//Ruta para SignIn con passport//
authRouter.post("/signIn", PassportSignUpController, SignupRedirectController);

//Ruta para falla de SignIn con passport//
authRouter.get("/failure-signup", FailureSignupController);

//Ruta para SignIn con Github//
authRouter.get("/github", GithubAuthController);

//Ruta para falla de SignIn con Github//
authRouter.get("/github-callback", GithubCallbackController, GithubCallbackRedirectController);

//Ruta para Login//
authRouter.post("/login", LoginController);

//Ruta para Current//
authRouter.get("/current", CurrentController);

//Ruta de Logout//
authRouter.post("/logout", LogoutController);

//Ruta de forgot password//
authRouter.post("/forgot", ForgotController);

export default authRouter;

