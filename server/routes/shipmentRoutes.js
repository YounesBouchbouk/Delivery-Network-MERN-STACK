const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const shipmentCnt = require("../controllers/shipmentsControllers");

router.use(protect);
// ShipmentStatu routes
router.post("/addMany/shipmentstatus", shipmentCnt.addManystatus);
router.post(
  "/deleteOne/shipmentstatus/:ShipmentStatusID",
  shipmentCnt.deleteShipmentStatus
);
// status workflow routes
router.post("/addMany/shipmentWorkflow", shipmentCnt.addManyWorkflows);
router.post(
  "/deleteOne/shipmentWorkflow/:workflowID",
  shipmentCnt.deleteWorkflow
);
router.get(
  "/workflow/getStatus/:workflowID",
  shipmentCnt.getWorkflowStatusItem
);

// shipment Status Work flow Item routes
router.post(
  "/add/shipmentStatusWorkflowItem",
  shipmentCnt.addShimentStatusWorkFlowItem
);
router.patch(
  "/asign/newNextStatus/:itemId",
  shipmentCnt.asignNewnextPossibleStatus
);

router.patch(
  "/change/fragment/status",
  shipmentCnt.ChangeShipmentFragementStatus
);
router.get("/getall/workflow", shipmentCnt.getAllworkflows);

module.exports = router;
