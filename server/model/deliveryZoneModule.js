const mongoose = require("mongoose");

const DeliveryZoneSchema = mongoose.Schema({
  delivery_service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: [true, "Delivery Service id is missing !"],
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    require: [true, "from  id is missing !"],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    require: [true, "to  id is missing !"],
  },
  estimated_days: {
    type: Number,
    require: [true, "estimated_days Service id is missing !"],
  },
  fees: {
    type: Number,
    default: 0,
  },
});
DeliveryZoneSchema.set("toObject", { virtuals: true });
DeliveryZoneSchema.set("toJSON", { virtuals: true });

// FIXME
DeliveryZoneSchema.virtual("shippingtariff", {
  ref: "shippingTariff",
  foreignField: "delivery_zone",
  localField: "_id",
});

DeliveryZoneSchema.pre(/^find/, function (next) {
  this.populate("delivery_service", "name Avatar businessname")
    .populate("from", "name")
    .populate("to", "name");

  // .populate({
  //   path: "shippingtariff",
  //   populate: {
  //     path: "shipping_type",
  //     model: "shippingType",
  //     select: "typeOfshipping",
  //   },
  // });
  next();
});

const DeliveryZone = mongoose.model("DeliveryZone", DeliveryZoneSchema);

module.exports = DeliveryZone;
