const mongoose = require("mongoose");
const { dateFormat } = require("../utils/FormatDate");

const packageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "sender of order is missing"],
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "title of order is missing"],
  },
  packageGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackageGroup",
  },
  description: {
    type: String,
    required: [true, "title of order is missing"],
  },
  packagedetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "packageDetails",
    require: [true, "packagedetails is missing"],
  },
  receiver: {
    name: {
      type: String,
      required: [true, "name of order is missing"],
    },
    phone: {
      type: [String],
      required: [true, "number phone of order is missing"],
    },
    email: {
      type: String,
      require: [true, "email required"],
    },
    note: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  // isCOD: {
  //   type: Boolean,
  //   required: [true, "isCOD  of order is missing"],
  // },
  // delivery: {
  //   address: { type: String, required: [true, "address of order is missing"] },
  //   note: { type: String, required: [true, "note of order is missing"] },
  // },
  amout: {
    type: String,
    required: [true, "amout of order is missing"],
  },
  isFragile: {
    type: Boolean,
    required: [true, "isFragile phone of order is missing"],
  },
  needsCollect: {
    type: Boolean,
    required: [true, "needsCollect phone of order is missing"],
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dimentions: {
    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  CreatedAt: {
    type: Date,
    default: new Date(),
  },
  createdYYYYMMDD: {
    type: Date,
    default: new Date(dateFormat(new Date(), "%Y-%m-%d", true)),
  },
});

packageSchema.set("toObject", { virtuals: true });
packageSchema.set("toJSON", { virtuals: true });

packageSchema.virtual("isToday").get(function () {
  const g2 = new Date();
  return this.CreatedAt.getTime() === g2.getTime();
});

packageSchema.pre(/^find/, function (next) {
  this.sort({ CreatedAt: 1 });
  next();
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
