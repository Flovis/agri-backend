const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models/index");
const app = express();
const { makeIo, getIo } = require("./socket");
const { checkDate } = require("./Controllers/CheckDate");

const cors = require("cors");
// app.use(cors());
app.use(
    cors({
        credentials: true,
    })
);
const router = require("./Routes/index");

const { createServer } = require("http");
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

makeIo(server);

const io = getIo();
// console.log("kadea ",io);

app.use("/", router);

server.listen(3500, () => {
    console.log("Server is running");
});

const intervalle = 24 * 60 * 60 * 1000;
setInterval(checkDate, intervalle);
// checkDate();

module.exports = server;
