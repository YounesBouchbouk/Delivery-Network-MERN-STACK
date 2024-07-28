const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const shippingtype = require("../model/shippingTypeModule");
const shippingTariff = require("../model/shippingTariff");
exports.addOneType = catchAsync(async (req, res, next) => {
  const List = await shippingtype.create(req.body);
  res.status(200).send({
    status: "successfully",
    List,
  });
});
exports.addManyType = catchAsync(async (req, res, next) => {
  const List = await shippingtype.create(req.body);
  res.status(200).send({
    status: "successfully",
    List,
  });
});

exports.getAllTypes = catchAsync(async (req, res, next) => {
  const List = await shippingtype.find({});
  res.status(200).send({
    status: "successfully",
    List,
  });
});

exports.getAllType = catchAsync(async (req, res, next) => {
  const List = await shippingtype.find({});

  res.status(200).send({
    status: "successfully",
    List,
  });
});

exports.addOneTariff = catchAsync(async (req, res, next) => {
  const {
    delivery_zone,
    shipping_type,
    price_par_kg,
    price_par_km,
    cost_par_unit_ofvolume,
    fees,
  } = req.body;
  const newtariff = await shippingTariff.create({
    delivery_zone,
    shipping_type,
    price_par_kg,
    price_par_km,
    cost_par_unit_ofvolume,
    fees,
  });
  res.status(200).send({
    status: "successfully",
    newtariff,
  });
});
exports.addManyTariff = catchAsync(async (req, res, next) => {
  const newtariffs = await shippingTariff.create(req.body);
  res.status(200).send({
    status: "successfully",
    newtariffs,
  });
});
exports.getAllTariff = catchAsync(async (req, res, next) => {
  const List = await shippingTariff
    .find({})
    .populate({
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    })
    .populate({
      path: "delivery_zone",
      populate: [
        {
          path: "delivery_service",
          model: "User",
          select: "name phone",
        },

        {
          path: "from",
          model: "City",
          select: "name",
        },
        {
          path: "to",
          model: "City",
          select: "name",
        },
      ],
    });

  res.status(200).send({
    status: "successfully",
    List,
  });
});

exports.getListOfTarrif = catchAsync(async (req, res, next) => {
  const idsArray = req.body;
  console.log(req.body);
  const List = await shippingTariff
    .find({
      _id: { $in: idsArray },
    })
    .populate({
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    })
    .populate({
      path: "delivery_zone",
      populate: [
        {
          path: "delivery_service",
          model: "User",
          select: "name phone",
        },

        {
          path: "from",
          model: "City",
          select: "name",
        },
        {
          path: "to",
          model: "City",
          select: "name",
        },
      ],
    });

  res.status(200).send({
    status: "successfully",
    List,
  });
});

exports.getTariffbyzone = catchAsync(async (req, res, next) => {
  const { deliveryzoneid } = req.params;
  const List = await shippingTariff
    .find({
      delivery_zone: deliveryzoneid,
    })
    .populate("shipping_type", "typeOfshipping")
    .populate({
      path: "delivery_zone",
      populate: [
        {
          path: "delivery_service",
          model: "User",
          select: "name phone",
        },
        {
          path: "from",
          model: "City",
          select: "name",
        },
        {
          path: "to",
          model: "City",
          select: "name",
        },
      ],
    });

  if (List.length === 0) {
    return next(new AppError("Empty or DeliveryZone Id ", 401));
  }
  res.status(200).send({
    status: "successfully",
    List,
  });
});
exports.deleteOneTariff = catchAsync(async (req, res, next) => {
  const { idShippingTariif } = req.params;

  const item = await shippingTariff.findByIdAndDelete(idShippingTariif);

  res.status(200).send({
    status: "successfully",
    item,
  });
});
