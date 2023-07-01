const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticate");
const {productData} = require( "../Controllers/productData")
const {addProduct} = require("../Controllers/production")

router.post("/login", login);
router.post("/production", addProduct)
router.get("/product/data", productData)


module.exports = router;
