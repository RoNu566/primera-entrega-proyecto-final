import { Router, json, urlencoded } from "express";
import usersModel from "../dao/models/users.model.js";
import { hashPassword, validatePassword } from "../utils.js";
import passport from "passport";


const authRouter = Router();
authRouter.use(json());
authRouter.use(urlencoded({ extended: true }));

authRouter.post("/signIn", passport.authenticate("singupStrategy", {
    failureRedirect: "/api/session/failure-signup"
}), (req, res) => {
    req.session.user = req.user.name
    req.session.email = req.user.email
    req.session.rol = req.user.rol
    console.log(req.session)
    res.send(`Usuario registrado exitosamente! Ingresa a tu pérfil haciendo click <a href="/profile">Aquí</a>`)
});

authRouter.get("/failure-signup", (req, res) => {
    res.send("Error, no se ha resigstrado el usuario")
});

authRouter.get("/github", passport.authenticate("githubSignup"));
authRouter.get("/github-callback", passport.authenticate("githubSignup", {
    failureRedirect: "/api/session/failure-signup"
}), (req, res) => {
    req.session.user = req.user.name
    req.session.email = req.user.email
    req.session.rol = "user"
    console.log(req.session)
    res.send(`Usuario registrado exitosamente! Ingresa a tu pérfil haciendo click <a href="/profile">Aquí</a>`)
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email: email });
        if (!user) {
            res.send(`No existe ese usuario, por favor registrate en nuestro sitio haciendo click <a href="/signIn">Aquí</a>`);
        } else if (email === user.email & validatePassword(user, password)) {
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

authRouter.get("/current", (req, res) => {
    if (req.session) {
        return res.send({ userInfo: req.session });
    }
    res.send("Usuario No Logueado");
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

authRouter.post("/forgot", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email: email });
        if (user) {
            user.password = hashPassword(password);
            const userUpdate = await usersModel.findOneAndUpdate({ email: user.email }, user);
            res.send("Su contraseña ha sido reestablecida")
        } else {
            req.send("Usuario no registrado")
        }
    } catch (error) {
        res.send("No se pudo restaurar la contraseña")
    }
});

export default authRouter;

// authRouter.post("/signIn", async (req, res) => {
//     try {
//         const { name, age, email, password } = req.body;
//         const user = await usersModel.findOne({ email: email })
//         let rol;
//         if (!user) {
//             if (email === "adminCoder@coder.com" & password === "adminCod3r123") {
//                 rol = "admin"
//             } else {
//                 rol = "user";
//             }
//             const nuevoUsuario = {
//                 name,
//                 age,
//                 email,
//                 password: hashPassword(password),
//                 rol,
//             }

//             const newUser = await usersModel.create(nuevoUsuario);
//             req.session.user = newUser.name
//             req.session.email = newUser.email
//             req.session.rol = newUser.rol
//             console.log("Se registro el usuario correctamente!");
//             res.redirect("/profile");
//         } else {
//             res.send("El usuario ingresado ya existe!")
//         }
//     }
//     catch (error) {
//         res.send({ status: 401, payload: "Error al registrar usuario!" })
//     }
// });
