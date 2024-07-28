const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const Country = require("../model/CountryModel");
const City = require("../model/CityModel");

exports.addOneCity = catchAsync(async (req, res, next) => {
  const { name, countryId } = req.body;

  const existe = await City.findOne({
    $and: [{ name: name }, { in_country: countryId }],
  });
  if (existe) {
    return next(new AppError("City Already Existe", 401));
  }

  const newcity = await City.create({
    name,
    in_country: countryId,
    added_by: req.user._id,
  });

  res.status(200).json({
    status: "successfuly",
    city: newcity,
  });
});

exports.getAllcities = catchAsync(async (req, res, next) => {
  // const cities = await City.find({}).populate("in_country");

  const featureQuery = new APIFeatures(
    City.find().populate("in_country"),
    req.query
  )
    .pagination()

    // .limitFields()
    .filter();
  // .sort();

  if (req.query.in_country) {
    nbTotal = await City.countDocuments({
      in_country: req.query.in_country,
    });
  } else {
    nbTotal = await City.countDocuments();
  }
  const cities = await featureQuery.query;
  res.status(200).json({
    nbTotal,
    cities,
  });
});

exports.getOneCity = catchAsync(async (req, res, next) => {
  const citieid = req.params.id;

  const selectedcitie = await City.findById(citieid)
    .populate("added_by", "_id  name")
    .populate("in_country");

  if (!selectedcitie) {
    return next(new AppError("There is no citie with this id", 401));
  }

  res.status(200).json({
    status: "successfully",
    citie: selectedcitie,
  });
});

exports.removeOneCity = catchAsync(async (req, res, next) => {
  const citieid = req.params.id;

  const selectedcitie = await City.findById(citieid);

  if (!selectedcitie) {
    return next(new AppError("There is no citie with this id", 401));
  }

  await City.findByIdAndDelete(citieid);

  res.status(200).json({
    status: "successfully",
    citie: selectedcitie,
  });
});

exports.addOneCountry = catchAsync(async (req, res, next) => {
  const { name, twoLetter } = req.body;

  const existe = await Country.findOne({
    $or: [
      {
        name,
      },
      {
        twoLetter,
      },
    ],
  });

  console.log(existe);

  if (existe) {
    return next(new AppError("Country Already Existe", 401));
  }

  const newcountry = await Country.create({
    name,
    twoLetter,
    added_by: req.user._id,
  });

  res.status(200).json({
    status: "successfuly",
    country: newcountry,
  });
});

exports.getAllCountry = catchAsync(async (req, res, next) => {
  const countries = await Country.find({}).populate("added_by");

  res.status(200).json({
    countries,
  });
});

exports.getOneCountry = catchAsync(async (req, res, next) => {
  const countryid = req.params.id;

  const selectedCounty = await Country.findById(countryid).populate("added_by");

  if (!selectedCounty) {
    return next(new AppError("There is no County with this id", 401));
  }

  res.status(200).json({
    status: "successfully",
    county: selectedCounty,
  });
});

exports.removeOneCountry = catchAsync(async (req, res, next) => {
  const countryid = req.params.id;

  const selectedCounty = await Country.findById(countryid);

  if (!selectedCounty) {
    return next(new AppError("There is no County with this id", 401));
  }

  const citiesdeleted = await City.deleteMany({
    in_country: countryid,
  });

  await Country.findByIdAndDelete(countryid);

  res.status(200).json({
    status: "successfully",
    county: selectedCounty,
    citiesdeleted,
  });
});
