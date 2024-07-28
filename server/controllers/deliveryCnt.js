const DeliveryZone = require("../model/deliveryZoneModule");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const User = require("../model/UserModel");
const shippingTariff = require("../model/shippingTariff");

exports.addOneZone = catchAsync(async (req, res, next) => {
  const { from, to, estimated_days, fees } = req.body;
  const userid = req.user._id;
  const newZone = await DeliveryZone.create({
    delivery_service: userid,
    from,
    to,
    estimated_days,
    fees,
  });

  res.status(201).send({
    status: "successfully",
    newZone,
  });
});

exports.getAuthDelivryServiceZone = catchAsync(async (req, res, next) => {
  const zoneList = await DeliveryZone.find({
    delivery_service: req.user._id,
  })
    .populate("delivery_service", "name phone")
    .populate("from", "name")
    .populate("to", "name")
    .populate({
      path: "shippingtariff",
      populate: {
        path: "shipping_type",
        model: "shippingType",
        select: "typeOfshipping",
      },
    });

  res.status(200).send({
    status: "successfully",
    zoneList,
  });
});

exports.getZonesInfoByDeliveryId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const zoneList = await DeliveryZone.find({
    delivery_service: userId,
  })
    .populate("delivery_service", "name phone")
    .populate("from", "name")
    .populate("to", "name")
    .populate({
      path: "shippingtariff",
      populate: {
        path: "shipping_type",
        model: "shippingType",
        select: "typeOfshipping",
      },
    });

  res.status(200).send({
    status: "successfully",
    zoneList,
  });
});

exports.getAllZonesOfaDelivery = catchAsync(async (req, res, next) => {
  const zoneList = await DeliveryZone.find({
    delivery_service: req.params.idService,
  }).populate({
    path: "shippingtariff",
    populate: {
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    },
  });

  if (zoneList.length === 0) {
    return next(new AppError("Ce service na aucun zone de laivraison"));
  }

  res.status(200).send({
    status: "successfully",
    zoneList,
  });
});

exports.getZoneByID = catchAsync(async (req, res, next) => {
  const zoneList = await DeliveryZone.findById(req.params.id).populate({
    path: "shippingtariff",
    populate: {
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    },
  });

  if (!zoneList) {
    return next(new AppError("Not Delivery zone found"));
  }

  res.status(200).send({
    status: "successfully",
    zoneList,
  });
});
exports.getAllZones = catchAsync(async (req, res, next) => {
  const zoneList = await DeliveryZone.find({}).populate({
    path: "shippingtariff",
    populate: {
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    },
  });

  if (!zoneList) {
    return next(new AppError("Not Delivery zone found"));
  }

  res.status(200).send({
    status: "successfully",
    zoneList,
  });
});

exports.removeOneById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  await DeliveryZone.findByIdAndDelete(id);
  await shippingTariff.findOneAndDelete({
    delivery_zone: id,
  });

  res.status(200).send({
    status: "successfully",
  });
});

exports.addWorkingDays = catchAsync(async (req, res, next) => {
  const Defaultobject = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    saturday: false,
    Sunday: false,
  };
  //   const { WorkingDays } = req.body;

  const finalobject = Object.assign(Defaultobject, req.body);
  const userr = await User.findById(req.user._id);

  userr.workingDays = finalobject;

  await userr.save({ validateBeforeSave: false });

  res.status(200).send({
    userr,
  });
});

exports.updatePhoneNumbers = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const userr = await User.findByIdAndUpdate(req.user._id, {
    $push: {
      phone: phone,
    },
  });

  res.status(200).send({
    status: "successfully",
    userr,
  });
});

const addWorkingDays = async (workingDays, id) => {
  const Defaultobject = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  };
  //   const { WorkingDays } = req.body;

  const finalobject = Object.assign(Defaultobject, workingDays);
  const userr = await User.findById(id);

  userr.workingDays = finalobject;
  userr.profileComplited = true;
  await userr.save({ validateBeforeSave: false });
};

const updatePhoneNumbers = async (phones, id) => {
  // const { phone } = req.body;
  const info = await User.findByIdAndUpdate(id, {
    $push: {
      phone: phones,
    },
  });

  return info;
};

const addMoreAdresses = async (adresses, id) => {
  const userr = await User.findById(id);

  userr.moreAdress = adresses;
  await userr.save({ validateBeforeSave: false });
};

exports.complateinformation = catchAsync(async (req, res, next) => {
  const { adresses, phones, workingdays, deliveryzones } = req.body;

  const userid = req.user._id;

  const zonesfinal = deliveryzones.map((item) => {
    return { ...item, delivery_service: userid };
  });

  await updatePhoneNumbers(phones, userid);
  await addMoreAdresses(adresses, userid);
  await addWorkingDays(workingdays, userid);
  await DeliveryZone.create(zonesfinal);

  res.status(201).send({
    status: "successfully",
  });
});

exports.updateWorkingDays = catchAsync(async (req, res, next) => {
  const { user } = req;
  const workingObj = req.body;

  console.log(workingObj);
  await addWorkingDays(workingObj, user._id);

  res.status(200).send({
    status: "successfully",
  });
});
