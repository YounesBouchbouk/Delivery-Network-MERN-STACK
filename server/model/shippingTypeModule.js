const mongoose = require("mongoose");

const shippingTypeSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
  type: {
    type: String,
    enum: ["air", "ocean", "ground"],
    require: [true, "type is missing"],
  },
  Description: {
    type: String,
  },
});
const shippingtype = mongoose.model("shippingType", shippingTypeSchema);

module.exports = shippingtype;
