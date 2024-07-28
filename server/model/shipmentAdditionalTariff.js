const mongoose = require("mongoose");

const shipmentAdditionalTariffSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
  additionalTariffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdditionalTariffType",
    require: [true, "additionalTariffId is missing"],
  },
  shippingFragmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipmentFragment",
    require: [true, "shippingFramgmentId is missing"],
  },
  description: {
    type: String,
    enum: ["import", "export", "port"],
    require: [true, "typeTariff is missing"],
  },
  amout: {
    type: String,
    required: [true, "amout of order is missing"],
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    require: [true, "Currency is missing"],
  },
});

const shipmentAdditionalTariff = mongoose.model(
  "shipmentAdditionalTariff",
  shipmentAdditionalTariffSchema
);
module.exports = shipmentAdditionalTariff;
