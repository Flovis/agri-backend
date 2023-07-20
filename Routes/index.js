const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticate");
const { productData } = require("../Controllers/productData");
const {
    addProduct,
    displayProducts,
} = require("../Controllers/PlanProduction");
const { sendtoAllUsers } = require("../Controllers/SendMessage");
const { addContents, displayContents } = require("../Controllers/Contents");
const { displayLanguages } = require("../Controllers/displayLanguage");
const { displayLocalisation } = require("../Controllers/Localisation");
const { saveProductionConfig } = require("../Controllers/Config");
const upload = require("../Middleware/upload");

router.post("/login", login);

router.post("/production", addProduct);

router.get("/allProduction/:id", displayProducts);

router.get("/allLocation/:id_localisation", displayLocalisation);

router.get("/allLocation", displayLocalisation);

router.post("/addProductionConfig", saveProductionConfig);

router.get("/product/data", productData);

router.post("/sendMsgAll", sendtoAllUsers);

//display languages
router.get("/languages", displayLanguages);

//Contents
router.post("/addContents", upload.single("file"), addContents);
router.get("/getContents/:category", displayContents);

module.exports = router;
