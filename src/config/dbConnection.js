import mongoose from "mongoose";
import { options } from "./options.js";

try {
    await mongoose.connect(options.mongoDB.url);
    console.log("conexion exitosa");
} catch (error) {
    console.log(`Hubo un error al conectarse ${error}`);
}