import FileProductManager from "../dao/file-managers/product.manager.js"
import FileCartManager from "../dao/file-managers/cart.manager.js"
import DbProductManager from "../dao/db-managers/product.manager.js"
import DbCartManager from "../dao/db-managers/cart.manager.js"

const config = {
    persistanceType: "db"
}

let ProductManager, CartManager;

if (config.persistanceType === "db") {
    ProductManager = DbProductManager;
    CartManager = DbCartManager;
} else if (config.persistanceType === "file") {
    ProductManager = FileProductManager;
    CartManager = FileCartManager;
} else {
    throw new Error("Tipo de Persistencia desconocida");

}

export { ProductManager, CartManager }

