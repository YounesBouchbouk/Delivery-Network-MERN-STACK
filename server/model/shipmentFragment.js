const mongoose = require("mongoose");

const shipmentFragmentSchema = mongoose.Schema({
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipment",
    required: [true, "shipmentId of fragment is missing"],
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
  ChosedTarrif: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shippingTariff",
    required: [true, "ChosedTarrif of order is missing"],
  },
  position: {
    type: Number,
    require: [true, "position is missing"],
  },
  hasNext: {
    type: Boolean,
    require: [true, "hasNext is missing"],
  },
  hasPrevious: {
    type: Boolean,
    require: [true, "hasPrevious is missing"],
  },
  currentstatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatusWorkflowItem",
    required: [true, "status of order is missing"],
  },
});

shipmentFragmentSchema.set("toObject", { virtuals: true });
shipmentFragmentSchema.set("toJSON", { virtuals: true });

shipmentFragmentSchema.virtual("StatusHistory", {
  ref: "shipmentStatusHistory",
  foreignField: "FragmentId",
  localField: "_id",
});

shipmentFragmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "currentstatus",
    model: "shipmentStatusWorkflowItem",
  })
    .populate("fromCity", "name")
    .populate("toCity", "name")
    .populate("ChosedTarrif");

  next();
});

const shipmentFragment = mongoose.model(
  "shipmentFragment",
  shipmentFragmentSchema
);
module.exports = shipmentFragment;
