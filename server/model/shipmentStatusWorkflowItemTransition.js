const mongoose = require("mongoose");

const shipmentStatusWorkflowItemTransitionSchema = mongoose.Schema({
  fromShipmentStatusWorkflowItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflowItem",
    required: [true, "status of order is missing"],
  },
  ToShipmentStatusWorkflowItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflowItem",
    required: [true, "status of order is missing"],
  },
});

const shipmentStatusWorkflowItemTransition = mongoose.model(
  "shipmentStatusWorkflowItemTransition",
  shipmentStatusWorkflowItemTransitionSchema
);

module.exports = shipmentStatusWorkflowItemTransition;
