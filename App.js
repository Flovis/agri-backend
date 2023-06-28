const express = require("express");
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./models/index");
const app = express();
const router = require("./Routes/index");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use(cors());

app.use("/", router);
//

app.listen(3500, () => {
    console.log("Server is running");
});
