import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();

app.use(express.static(__dirname + "/../public"))

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New Client Connected")
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);



