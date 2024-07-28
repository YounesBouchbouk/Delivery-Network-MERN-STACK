const mongoose = require("mongoose");

const shipmentStatusHistorySchema = mongoose.Schema({
  FragmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentFragment",
    required: [true, "status of order is missing"],
  },
  fromStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatus",
    required: [true, "status of order is missing"],
  },
  toStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentStatus",
    required: [true, "status of order is missing"],
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "status of order is missing"],
  },
  description: {
    type: String,
  },
  changedAtdate: {
    type: Date,
    default: new Date.now(),
  },
});

shipmentStatusHistory.set("toObject", { virtuals: true });
shipmentStatusHistory.set("toJSON", { virtuals: true });

shipmentStatusHistory.pre(/^find/, function (next) {
  this.populate({
    path: "fromStatus",
    model: "shipmentStatus",
    select: " name",
  })
    .populate("toStatus", "name")
    .populate("changedBy", "name email")
    .populate("toStatus", "name");
  next();
});

const shipmentStatusHistory = mongoose.model(
  "shipmentStatusHistory",

  shipmentStatusHistorySchema
);

module.exports = shipmentStatusHistory;
