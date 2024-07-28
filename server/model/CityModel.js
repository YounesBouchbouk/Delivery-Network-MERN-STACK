const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nome  est obligé "],
  },
  in_country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

CitySchema.pre("create", (next) => {
  this.CreatedAt = new Date.now();
  next();
});

CitySchema.pre(/^find/, function (next) {
  this.sort({ create: 1 });
  next();
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
