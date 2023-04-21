import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

const validatePassword = (user, loginPasword) => {
    return bcrypt.compareSync(loginPasword, user.password);

}


export { __dirname, hashPassword, validatePassword };

