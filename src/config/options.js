import dotenv from "dotenv"
dotenv.config();

export const options = {
    fileSystem: {
        productsFileSystem: 'products.json',
        cartFileSysyem: 'cart.json'
    },
    mongoDB: {
        URL: process.env.MONGO_URL,
    },
    server: {
        port: process.env.PORT,
        secretSession: process.env.SECRET_KEY,
    }
};

