const mongoose = require("mongoose");

const AdditionalTariffTypeSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
});
const AdditionalTariffType = mongoose.model(
  "AdditionalTariffType",
  AdditionalTariffTypeSchema
);
module.exports = AdditionalTariffType;
