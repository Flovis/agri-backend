const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models/index");
const app = express();
const { makeIo, getIo } = require("./socket");
const { cron } = require("./Controllers/CronProduction");

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
io.on("NouveauPlan", (data) => {
    console.log("From cron", data);
    console.log("IO", io)

});

app.use("/", router);

server.listen(3500, () => {
    console.log("Server is running");
});

module.exports = server;
