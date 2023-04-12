import express from "express";
import { json } from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";
import mongoose from "mongoose";
import ChatManager from "./dao/db-managers/chat.manager.js";
import session from "express-session";
const app = express();
app.use(json());

app.use(express.static(__dirname + "/../public"))

let messages = [];
const chatManager = new ChatManager();

//-----Hnadlebars-----//
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


//-----Socket-----//
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New Client Connected")

  socket.on("messages", async (data) => {
    const { username, message } = await chatManager.newMessage(data)
    messages.push(data);

    io.emit("messages", messages)
  });

  socket.on("new-user", (username) => {
    socket.emit(messages, messages);
    socket.broadcast.emit("new-user", username)
  })
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

//-----Router-----//

app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/products", viewsRouter);

//-----Moongose-----//
mongoose.connect("mongodb+srv://rocion5666:mipassword123@clusterrn.faiksh6.mongodb.net/?retryWrites=true&w=majority")
console.log("Conected to Db")

//-------------session-------//
app.use(
  session({
    secret: "my-secret",
    saveUninitialized: true,
    resave: true,
  })
);
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;

    return res.send(`Cantidad de visitas ${req.send.counter}`);
  }

  req.session.counter = 1;
  res.send("Welcome!");
});

app.use(express.json());
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== "user" && password !== "password") {
    return res.status(401).send("Login failed");
  }
  req.session.user = username;
  req.session.isAdmin = true;

  res.send("login successful");
});

function authenticate(req, res, next) {
  if (req.session.user === "user" && req.session.isAdmin) {
    return next();
  }

  return res.status(401).send("Error de autentificacion");
}

app.get("/privado", authenticate, (req, res) => {
  res.send("Login OK");
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    res.send("logout OK");
  });
});