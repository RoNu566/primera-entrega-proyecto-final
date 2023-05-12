import { CartManager } from "../dao/index.js"
import { manager } from "../controllers/products.controller.js"

const cartManager = new CartManager();

export const GetCartController = async (req, res) => {
    let carrito = await cartManager.getCart();
    res.send(carrito);
}

export const CreateCartController = async (req, res) => {
    let carrito = await cartManager.addCart();
    res.send(carrito);
}

export const GetCartByIdController = async (req, res) => {
    let cid = req.params.cid;
    let carrito = await cartManager.checkCart(cid);
    if (!carrito) {
        res.send("Este carrito no existe")
    } else {
        res.send(carrito);
    }
}

export const AddProductToCartController = async (req, res) => {
    const { cid, pid } = req.params;
    const IdProd = pid;
    const IdCart = cid;
    try {
        let product = await manager.getProductById(IdProd);
        await cartManager.addProductToCart(IdCart, product);
        res.status(201).send(`Producto ${IdProd} agregado al carrito ${IdCart}`);
    } catch (error) {
        res.status(404).send("No se pudo agregar producto al carrito")
    }
}

export const DeleteProductFromCartController = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await cartManager.deletProdfromCart(cid, pid);
        res.send({ status: "success", payload: "Seelimino el producto del carrito" })
    } catch (err) {
        res.send({ status: "failed", payload: "No se pudo eliminar el producto del carrito" })
    }
}

export const DeleteCartController = async (req, res) => {
    try {
        const { cid } = req.params;
        await cartManager.deleteCar(cid);
        res.send({ status: "Success", payload: "Se elimino el carrito" })
    } catch (err) {
        res.send({ status: "Failed", payload: "No se ha eliminado el carrito" })
    }

}