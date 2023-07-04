const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models/index");
const app = express();
const router = require("./Routes/index");
const cors = require("cors");

const { createServer } = require("http");
const server = createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use(cors());

app.use("/", router);
//

io.on("connexion", (socket) => {
    console.log("connected");
});
// Création de la connexion WebSocket
io.on("connection", (socket) => {
    console.log("Un client s'est connecté");

    socket.on("disconnect", () => {
        console.log("Un client s'est déconnecté");
    });
});

server.listen(3500, () => {
    console.log("Server is running");
});

module.exports = { io };
