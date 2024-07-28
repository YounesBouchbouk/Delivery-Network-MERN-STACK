const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  packageGroupid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackageGroup",
    require: [true, "PackageGroup of this shippment is required"],
  },
  fromCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "fromCity of order is missing"],
  },
  toCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "toCity of order is missing"],
  },

  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflowItem",
    required: [true, "status of order is missing"],
  },
  workflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflow",
    required: [true, "status of order is missing"],
  },
});

shipmentSchema.set("toObject", { virtuals: true });
shipmentSchema.set("toJSON", { virtuals: true });

shipmentSchema.virtual("shipment_fragments", {
  ref: "shipmentFragment",
  foreignField: "shipmentId",
  localField: "_id",
});

shipmentSchema.pre(/^find/, function (next) {
  this.populate("fromCity", "name")
    .populate("toCity", "name")
    .populate("status", "name")
    .populate("shipment_fragments")
    .populate({
      path: "workflow",
    });
  next();
});

const shipment = mongoose.model("shipment", shipmentSchema);
module.exports = shipment;
