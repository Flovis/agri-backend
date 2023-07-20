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
const { saveMeteoConfig } = require("../Controllers/Config");
const upload = require("../Middleware/upload");

//Auth

router.post("/login", login);

//Production
router.post("/production", addProduct);
router.get("/allProduction/:id", displayProducts);
router.post("/addProductionConfig", saveMeteoConfig);

//Contents
router.post("/addContents", upload.single("file"), addContents);
router.get("/getContents/:category", displayContents);

//Location
router.get("/allLocation/:id_localisation", displayLocalisation);
router.get("/allLocation", displayLocalisation);

//Send message
router.post("/sendMsgAll", sendtoAllUsers);


router.get("/product/data", productData);


//display languages
router.get("/languages", displayLanguages);



module.exports = router;
