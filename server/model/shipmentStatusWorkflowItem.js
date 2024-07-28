const mongoose = require("mongoose");

const shipmentStatusWorkflowItemSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
  description: {
    type: String,
    require: [true, "description is missing"],
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatus",
    required: [true, "status of order is missing"],
  },
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflow",
    required: [true, "status of order is missing"],
  },
  position: {
    type: String,
    enum: ["start", "intermidiate", "end"],
  },
  next_possible_status: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "shipmentStatusWorkflowItem",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

shipmentStatusWorkflowItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "status",
    model: "shipmentStatus",
  });

  this.populate({
    path: "next_possible_status",
    select: "_id name",
  });

  next();
});
const shipmentStatusWorkflowItem = mongoose.model(
  "shipmentStatusWorkflowItem",
  shipmentStatusWorkflowItemSchema
);

module.exports = shipmentStatusWorkflowItem;
