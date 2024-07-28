const User = require("../model/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const { mailTransporter } = require("../utils/Mailer");
const Currency = require("../model/CurrencyModel");
const Package = require("../model/packageModule");
const fragments = require("../model/shipmentFragment");
const shipmentSchema = require("../model/shipment");
// const dateformat = require("dateformat");
const { dateFormat } = require("../utils/FormatDate");

exports.getAnalitiques = catchAsync(async (req, res, next) => {
  const nbcostumers = await User.countDocuments({
    role: "user",
  });

  const nbservices = await User.countDocuments({
    role: "deliverycompanie",
  });

  const nbFragments = await fragments.countDocuments({});
  let newdate = new Date(dateFormat(new Date(), "%Y-%m-%d", true));
  const todayPackages = await Package.countDocuments({
    createdYYYYMMDD: newdate,
  });
  const nbColies = await Package.countDocuments({});
  const nbColiesLivred = await shipmentSchema.countDocuments({
    status: {
      $in: [
        "62901db8a5e07f813b53d2dd",
        "62901d2ea5e07f813b53d2d6",
        "6277e1a12031504952446d15",
        "6277d8a20e7a562d6fb00c39",
      ],
    },
  });

  let today = new Date();
  let last7days = [];
  for (let i = 1; i <= 6; i++) {
    console.log(today);
    last7days.unshift(dateFormat(today, "%Y-%m-%d", true));
    today = new Date(today.setDate(today.getDate() - 1));
  }
  last7days.push(new Date());

  // let nbcostumers = 0;
  // let nbservices = 0;
  // let nbFragments = 0;
  // let nbColiesLivred = 0;
  // let todayPackages = 0;

  res.status(200).send({
    analitycs: {
      nbcostumers,
      nbservices,
      nbFragments,
      nbColies,
      nbColiesLivred,
      todayPackages,
    },
  });
});

exports.filterpackagebydate = catchAsync(async (req, res, next) => {
  const { dateTo } = req.params;

  let newDateFomat = new Date(dateTo);

  const packagecount = await Package.countDocuments({
    createdYYYYMMDD: newDateFomat,
  });
  res.status(200).send({
    packagecount,
  });
});

exports.addManyCurrency = catchAsync(async (req, res, next) => {
  const newCurrency = await Currency.create(req.body);

  res.status(200).send({
    status: "successfully",
    newCurrency,
  });
});

exports.getAllCurrency = catchAsync(async (req, res, next) => {
  const ListCurrency = await Currency.find({});

  res.status(200).send({
    status: "successfully",
    ListCurrency,
  });
});

exports.deleteOneCurrency = catchAsync(async (req, res, next) => {
  const { currencyId } = req.params;

  const selectedcurrency = await Currency.findById(currencyId);

  if (!selectedcurrency) {
    return next(new AppError("There is no Currency ", 401));
  }

  await Currency.findByIdAndDelete(currencyId);

  res.status(200).json({
    status: "successfully",
    currency: selectedcurrency,
  });
});
