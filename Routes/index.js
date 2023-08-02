const express = require("express");
const router = express.Router();
const { login } = require("../Controllers/authenticate");
const { productData } = require("../Controllers/productData");
const {
    addProduct,
    displayProducts,
    displayAllProductPlan,
} = require("../Controllers/PlanProduction");
const { addContents, displayContents } = require("../Controllers/Contents");
const { displayLanguages } = require("../Controllers/displayLanguage");
const { displayLocalisation } = require("../Controllers/Localisation");
const { getStatistics } = require("../Controllers/Count");
const {
    saveMeteoConfig,
    displayMeteoConfig,
} = require("../Controllers/Config");
const {checkDateConfigMeteo} = require("../Controllers/CheckDate")
const upload = require("../Middleware/upload");

//Auth
router.post("/login", login);

//Production
router.post("/production", addProduct);
router.get("/allProduction/:id", displayProducts);
router.get("/allProductsPlan", displayAllProductPlan);

//Statistics
router.get("/statistics", getStatistics);

//config
router.post("/addMeteoConfig", saveMeteoConfig);
router.get("/getMeteoConfig/:id_user", displayMeteoConfig);

//Contents
router.post("/addContents", upload.single("file"), addContents);
router.get("/getContents/:category", displayContents);

//Location
router.get("/allLocation/:id_localisation", displayLocalisation);
router.get("/allLocation", displayLocalisation);

router.get("/product/data", productData);

//display languages
router.get("/languages", displayLanguages);

router.get("/date", checkDateConfigMeteo),

module.exports = router;
