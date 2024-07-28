const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const adminCnt = require("../controllers/AdminControllers");
const packageCnt = require("../controllers/packageCnt");
router.post("/addMany/currency", adminCnt.addManyCurrency);
router.get("/getAll/currency", adminCnt.getAllCurrency);
router.delete("/delete/onePackage/:packageId", packageCnt.deleteOnepackage);
router.delete("/delete/oneCurrency/:currencyId", adminCnt.deleteOneCurrency);
router.get("/get/statistique", adminCnt.getAnalitiques);
router.get("/get/analytics/:dateTo", adminCnt.filterpackagebydate);

module.exports = router;
