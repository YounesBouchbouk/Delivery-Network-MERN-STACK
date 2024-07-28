const mongoose = require("mongoose");

const packageGroupSchema = new mongoose.Schema({
  discount: { type: Number, default: 0 },
  packageCount: {
    type: Number,
  },
});

packageGroupSchema.set("toObject", { virtuals: true });
packageGroupSchema.set("toJSON", { virtuals: true });

packageGroupSchema.virtual("shipment", {
  ref: "shipment",
  foreignField: "packageGroupid",
  localField: "_id",
});

packageGroupSchema.pre(/^find/, function (next) {
  this.populate("shipment");
  next();
});

const packageGroup = mongoose.model("PackageGroup", packageGroupSchema);
module.exports = packageGroup;
