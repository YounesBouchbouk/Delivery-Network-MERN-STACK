const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const deliveryCnt = require("../controllers/deliveryCnt");

router.use(protect);
// from Delivery USer

// get all delivery zone of a delivery service    :idService === Id of Delivery Company
router.get(
  "/getOne/service/deliveryZone/:idService",
  deliveryCnt.getAllZonesOfaDelivery
);
router.patch("/addWorkingDays", deliveryCnt.addWorkingDays);
router.patch("/updatephone", deliveryCnt.updatePhoneNumbers);

router.post("/comlete/infomation", deliveryCnt.complateinformation);
router.patch("/update/workingDays", deliveryCnt.updateWorkingDays);
// from deliveryZoneSchema
router.post("/add/deliveryZone", deliveryCnt.addOneZone);
router.get("/getOne/deliveryZone/:id", deliveryCnt.getZoneByID);
router.get("/getAll/deliveryZone", deliveryCnt.getAllZones);
router.get("/getAuth/deliveryZone", deliveryCnt.getAuthDelivryServiceZone);
router.get(
  "/getDelivery/deliveryZone/:userId",
  deliveryCnt.getZonesInfoByDeliveryId
);
router.delete("/remove/deliveryZone/:id", deliveryCnt.removeOneById);

module.exports = router;
