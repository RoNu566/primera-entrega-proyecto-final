import { Router, json, urlencoded } from "express";
import usersModel from "../dao/models/users.model.js";

const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post("/signIn", async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        const user = await usersModel.findOne({ email: email })
        let rol;
        if (!user) {
            if (email === "adminCoder@coder.com" & password === "adminCod3r123") {
                rol = "admin"
            } else {
                rol = "user";
            }
            const newUser = await usersModel.create({ name, age, email, password, rol });
            req.session.user = newUser.name
            req.session.email = newUser.email
            req.session.rol = newUser.rol
            console.log("Se registro el usuario correctamente!");
            res.redirect("/profile");
        } else {
            res.send("El usuario ingresado ya existe!")
        }
    }
    catch (error) {
        res.send({ status: 401, payload: "Error al registrar usuario!" })
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email: email });
        if (!user) {
            res.send(`No existe ese usuario, por favor registrate en nuestro sitio haciendo click <a href="/signIn">Aquí</a>`);
        } else if (email === user.email & password === user.password) {
            req.session.user = user.name;
            req.session.email = user.email;
            req.session.rol = user.rol;
            console.log("usuario registrado")
            res.redirect("/products")
        } else {
            res.send("Usuario y/o contraseña incorrecto")
        }
    } catch (error) {
        res.status(403).send("Error de autentificación")
    }
});

authRouter.post("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send("No se pudo cerrar sesion");
        } else {
            res.redirect("/login")
        }
    });
});

export default authRouter;