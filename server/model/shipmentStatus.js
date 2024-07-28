const mongoose = require("mongoose");

const shipmentStatusSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is missing"],
  },
  description: {
    type: String,
    require: [true, "description is missing"],
  },
});

const shipmentStatus = mongoose.model("shipmentStatus", shipmentStatusSchema);
module.exports = shipmentStatus;
