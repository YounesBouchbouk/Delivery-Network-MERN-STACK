const mongoose = require("mongoose");

const shipmentStatusWorkflowSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
  description: {
    type: String,
    require: [true, "description is missing"],
  },
});

shipmentStatusWorkflowSchema.set("toObject", { virtuals: true });
shipmentStatusWorkflowSchema.set("toJSON", { virtuals: true });

shipmentStatusWorkflowSchema.virtual("StatusList", {
  ref: "shipmentStatusWorkflowItem",
  foreignField: "workflow",
  localField: "_id",
});

const shipmentStatusWorkflow = mongoose.model(
  "shipmentStatusWorkflow",
  shipmentStatusWorkflowSchema
);

module.exports = shipmentStatusWorkflow;
