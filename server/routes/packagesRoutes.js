const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const packageCnt = require("../controllers/packageCnt");

router.use(protect);
router.post("/addOne/Package", packageCnt.addOnepackage);
router.post("/addMany/Package", packageCnt.addManypackage);
router.get("/getAll/Package", packageCnt.getAllpackage);
router.get("/getOne/Package/:packageId", packageCnt.getOnepackage);
router.get("/getUser/package/:userId", packageCnt.getUserpackages);
router.patch("/update/package/:packageId", packageCnt.updatepackage);
router.post("/findpackageRoute", packageCnt.findRoute);
router.get(
  "/find/Delivery/packages/:deliveryId",
  packageCnt.getDeliverypackages
);
module.exports = router;
