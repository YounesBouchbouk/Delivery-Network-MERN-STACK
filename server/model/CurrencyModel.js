const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is messing"],
  },
  symbol: { type: String, required: [true, "symbol is messing"] },
});

currencySchema.set("toObject", { virtuals: true });
currencySchema.set("toJSON", { virtuals: true });

const Currency = mongoose.model("Currency", currencySchema);
module.exports = Currency;
