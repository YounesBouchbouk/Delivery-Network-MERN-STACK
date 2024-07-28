const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const shippingCnt = require("../controllers/shippingControllers");

router.use(protect);

router.post("/addOne/shippingType", shippingCnt.addOneType);
router.post("/addMany/shippingType", shippingCnt.addManyType);
router.get("/getAll/shippingType", shippingCnt.getAllTypes);

router.post("/addOne/shippingTariff", shippingCnt.addOneTariff);
router.post("/addMany/shippingTariff", shippingCnt.addManyTariff);
router.post("/List/shippingTariff", shippingCnt.getListOfTarrif);

router.get("/getAll/shippingTariff", shippingCnt.getAllTariff);
router.delete(
  "/DeleteOne/shippingTariff/:idShippingTariif",
  shippingCnt.deleteOneTariff
);
router.get(
  "/getAllbyDelivryzone/shippingTariff/:deliveryzoneid",
  shippingCnt.getTariffbyzone
);

module.exports = router;
