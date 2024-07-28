const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nome  est obligé "],
  },
  twoLetter: {
    type: String,
    required: [true, "Please provide a 2 letter name MA UK ..."],
  },
  CreatedAt: {
    type: Date,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   cities_List: {
  //     type: [mongoose.Schema.Types.ObjectId],
  //     ref: "City",
  //   },
  // DeliveryList : {
  //     type : [mongoose.Schema.Types.ObjectId],
  //     ref  : 'Delivery_Service'
  // }
});

CountrySchema.pre("create", function (next) {
  this.CreatedAt = new Date.now();
  next();
});
CountrySchema.pre(/^find/, function (next) {
  this.sort({ create: 1 });
  next();
});

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
