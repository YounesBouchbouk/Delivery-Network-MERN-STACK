const mongoose = require("mongoose");

const shippingTariffSchema = mongoose.Schema({
  delivery_zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryZone",
    require: [true, "delivery_zone Service id is missing !"],
  },
  shipping_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shippingType",
    require: [true, "shippingType Service id is missing !"],
  },
  price_par_km: {
    type: Number,
    default: 0,
  },
  price_par_kg: {
    type: Number,
    default: 0,
  },
  cost_par_unit_ofvolume: {
    type: Number,
    default: 0,
  },
  fees: {
    type: Number,
    default: 0,
  },
});

shippingTariffSchema.virtual("shipping_fragments", {
  ref: "shipmentFragment",
  foreignField: "ChosedTarrif",
  localField: "_id",
});

shippingTariffSchema.pre(/^find/, function (next) {
  this.populate("delivery_zone").populate("shipping_type");

  next();
});

const shippingTariff = mongoose.model("shippingTariff", shippingTariffSchema);

module.exports = shippingTariff;
