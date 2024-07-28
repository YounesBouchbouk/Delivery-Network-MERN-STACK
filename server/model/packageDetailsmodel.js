const mongoose = require("mongoose");

const detailsSchema = mongoose.Schema({
  discountPrice: {
    type: Number,
    default: 0,
  },
  totlaPrice: {
    type: Number,
    default: 0,
  },
  currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Currency",
    require: [true, "Currency is missing"],
  },
  orderLines: {
    unitePrice: {
      type: Number,
      default: 0,
    },
    qty: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    products: [
      {
        title: {
          type: String,
          require: [true, "Prooduct Are missing"],
        },
        Description: {
          type: String,
          require: [true, "Description is issing"],
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

detailsSchema.set("toObject", { virtuals: true });
detailsSchema.set("toJSON", { virtuals: true });

const packageDetails = mongoose.model("packageDetails", detailsSchema);
module.exports = packageDetails;
