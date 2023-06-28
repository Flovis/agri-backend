const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticate");
const {productData} = require( "../Controllers/productData")

router.post("/login", login);
router.get("/product/data", productData)

module.exports = router;
