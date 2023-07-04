const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticate");
const { productData } = require("../Controllers/productData");
const { addProduct, displayProducts } = require("../Controllers/PlanProduction");
const { sendtoAllUsers } = require("../Controllers/AllUsersMessages");
const { addContents, displayContents } = require("../Controllers/Contents");
const { displayLanguages } = require("../Controllers/displayLanguage");
const upload = require("../Middleware/upload");

router.post("/login", login);

router.post("/production", addProduct);

router.get("/allProduction/:id", displayProducts);

router.get("/product/data", productData);

router.post("/sendMsgAll", sendtoAllUsers);

//display languages
router.get("/languages", displayLanguages);

//Contents
router.post("/addContents", upload.single("file"), addContents);
router.get("/getContents/:category", displayContents);


module.exports = router;
