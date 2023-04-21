import passport from "passport";
import localStrategy from "passport-local";
import usersModel from "../dao/models/users.model.js";
import { hashPassword, validatePassword } from "../utils.js";

const initializedPassport = () => {
    passport.use("singupStrategy", new localStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const { name, age } = req.body;
                const user = await usersModel.findOne({ email: username });
                if (user) {
                    return done(null, false)
                }
                const nuevoUsuario = {
                    name,
                    age,
                    email: username,
                    password: hashPassword(password),
                    rol,
                };
                const userCreated = await usersModel.create(nuevoUsuario);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }

        }
    ))
}
export { initializedPassport }