const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const packageDetails = require("../model/packageDetailsmodel");
const Package = require("../model/packageModule");
const packagegroup = require("../model/packageGroupModel");
const shipment = require("../model/shipment");
const DeliveryZone = require("../model/deliveryZoneModule");
const neo4j = require("neo4j-driver");
const City = require("../model/CityModel");
const shipmentFragment = require("../model/shipmentFragment");
const shippingTariff = require("../model/shippingTariff");
const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "toor")
);

const findPathFunction = (from, to) => {
  var session = driver.session();
  const phathQuery = `MATCH path = (a:City)-[*]-(b:City) WHERE a.name = "${from}" AND b.name="${to}" WITH nodes(path) as pw RETURN pw , size(pw)  ORDER by size(pw)  `;
  // let foundedpath = [];

  foundedpathObj = {};
  session
    .run(phathQuery)
    .then(function (result) {
      result.records.forEach(function (record, index) {
        foundedpathObj = {
          ...foundedpathObj,
          [index + 1]: record._fields[0].map((item) => item.properties.name),
        };
        // foundedpath.push(record._fields[0].map((item) => item.properties.name));
      });

      session.close();
      driver.close();

      return foundedpathObj;
    })
    .catch(function (error) {
      driver.close();
    });
};

// package
exports.getDeliverypackages = catchAsync(async (req, res, next) => {
  const { deliveryId } = req.params;

  const zone = await DeliveryZone.find({
    delivery_service: deliveryId,
  }).select("_id delivery_service");

  let zoneIds = zone.map((item) => {
    return item._id;
  });

  const tarrif = await shippingTariff.find({
    delivery_zone: {
      $in: zoneIds,
    },
  });
  let tarrifsIds = tarrif.map((item) => {
    return item._id;
  });

  const fragments = await shipmentFragment
    .find({
      ChosedTarrif: {
        $in: tarrifsIds,
      },
    })
    .select("shipmentId")
    .populate("shipmentId");
  let packageGroupid = fragments.map((item) => item.shipmentId.packageGroupid);

  const packagesList = await Package.find({
    packageGroup: {
      $in: packageGroupid,
    },
  }).populate("packageGroup");

  res.status(200).send({
    status: "successfully",

    packagesList,
  });

  // Woorked but need map
  // const response = await Package.find({}).populate("packageGroup");
  // res.status(200).send({
  //   status: "successfully",
  //   response: response[2],
  // });
});

exports.getUserpackages = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const packages = await Package.find({
    sender: userId,
  }).populate("packageGroup");

  res.status(200).send({
    status: "successfully",
    packages,
  });
});
exports.addOnepackage = catchAsync(async (req, res, next) => {});
exports.addManypackage = catchAsync(async (req, res, next) => {
  let packagesLst = req.body.packages;
  let { shipments, shipment_fragments } = req.body;
  //calclate group discount dipends on Nomber of package
  const discount = packagesLst.length == 1 ? 0 : packagesLst.length * 2;

  const packageGroup = await packagegroup.create({
    discount,
    packageCount: packagesLst.length,
  });

  shipments = { ...shipments, packageGroupid: packageGroup._id };

  // to add sender attribute and packageGroup to eache object
  let newList = await Promise.all(
    packagesLst.map(async (item) => {
      const { packagedetails } = item;
      const packageitemDt = await packageDetails.create(packagedetails);
      return {
        ...item,
        sender: String(req.user._id),
        packageGroup: String(packageGroup._id),
        packagedetails: String(packageitemDt._id),
      };
    })
  );

  const newpackages = await Package.create(newList);
  const newshipment = await shipment.create(shipments);

  const newFragmentsListe = shipment_fragments.map((item) => {
    return {
      ...item,
      shipmentId: newshipment._id,
    };
  });

  const newFragments = await shipmentFragment.create(newFragmentsListe);

  if (newpackages.lenght === 0) {
    return next(new AppError("Something went wrong", 401));
  }

  res.status(201).send({
    status: "successfully",
    packageGroup,
    newpackages,
    newshipment,
    newFragments,
  });
});
exports.getAllpackage = catchAsync(async (req, res, next) => {
  const packageList = await Package.find({});

  if (packageList.lenght === 0) {
    return next(new AppError("Emty array", 401));
  }

  res.status(201).send({
    status: "successfully",
    packageList,
  });
});
exports.getOnepackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;
  const package = await Package.findById(packageId)
    .populate("sender", "_id name email")
    .populate({
      path: "packageGroup",
      model: "PackageGroup",
      populate: {
        path: "shipment",
        model: "shipment",
        populate: {
          path: "shipment_fragments",
          model: "shipmentFragment",
          populate: {
            path: "ChosedTarrif",
            model: "shippingTariff",
            populate: {
              path: "delivery_zone",
              model: "DeliveryZone",
              populate: {
                path: "delivery_service",
                model: "User",
              },
            },
          },
        },
      },
    })
    .populate("packagedetails");

  if (!package) {
    return next(new AppError("no package with that id", 401));
  }

  res.status(201).send({
    status: "successfully",
    package,
  });
});

exports.deleteOnepackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;
  const package = await Package.findById(packageId);

  if (!package) {
    return next(new AppError("Emty array", 401));
  }

  const { packageGroup, packagedetails } = package;

  //delete package  first
  await Package.findByIdAndDelete(packageId);

  //check if the package has been deleted to delete others
  const checkPackage = await Package.findById(packageId);

  if (checkPackage) {
    return next(new AppError("package was not deleted ", 401));
  }

  await packageDetails.findByIdAndDelete(packagedetails);

  //select the packageGroup

  const pgroup = await packagegroup.findById(packageGroup);

  //check if he has only one package thene delete is if not keep it
  if (pgroup.packageCount === 1) {
    await packagegroup.findByIdAndDelete(packageGroup);
  } else {
    const newCount = pgroup.packageCount - 1;
    const newDiscount = newCount === 1 ? 0 : newCount * 2;
    pgroup.packageCount = newCount;
    pgroup.discount = newDiscount;
    pgroup.save();
  }

  res.status(200).send({
    status: "deleted successfuly",
  });
});

exports.updatepackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;

  // const { newpackageInfo } = req.body;

  const package = await Package.findById(packageId);

  if (!package) {
    return next(new AppError("no package with that id", 401));
  }

  let updatedData = Object.assign(package, req.body);

  const newOrder = await Package.findByIdAndUpdate(packageId, updatedData);

  res.status(201).send({
    status: "successfully",
    newOrder,
  });
});

const returnFragment = async (item, fragment, globalFragments, position) => {
  var count = item.length;
  let check = false;
  // var fragment = [];
  await Promise.all(
    item.map(async (city, index) => {
      if (index < count - 1) {
        const city1res = await City.findOne({ name: item[index] });
        const city2res = await City.findOne({ name: item[index + 1] });
        const city1 = city1res._id;
        const city2 = city2res._id;
        const r1 = await DeliveryZone.find({
          $and: [{ from: city1 }, { to: city2 }],
        }).populate({
          path: "shippingtariff",
          populate: {
            path: "shipping_type",
            model: "shippingType",
            select: "typeOfshipping",
          },
        });

        if (r1.length === 0) {
          // fragment = [];
          check = true;
          // return;
        }

        fragment.push({
          fragment: {
            from: {
              id: city1,
              name: city1res.name,
            },
            to: {
              id: city2,
              name: city2res.name,
            },
          },

          deliveryZone: r1,
        });
      } else {
      }
    })
  );

  if (!check) globalFragments.push(fragment);
};
exports.findRoute = catchAsync(async (req, res, next) => {
  const { from, to, calculat } = req.body;
  var session = driver.session();

  const DirectPath = await DeliveryZone.find({
    $and: [
      {
        from: from,
      },
      {
        to: to,
      },
    ],
  }).populate({
    path: "shippingtariff",
    populate: {
      path: "shipping_type",
      model: "shippingType",
      select: "typeOfshipping",
    },
  });

  if (DirectPath.length > 0) {
    return res.status(200).send({
      status: "successfully",
      path: [
        [
          {
            deliveryZone: DirectPath,
          },
        ],
      ],
    });
  }

  const fromObj = await City.findById(from);
  const toObj = await City.findById(to);

  const fromName = fromObj.name;
  const toName = toObj.name;

  const phathQuery = `MATCH path = (a:City)-[*1..3]-(b:City) WHERE a.name = "${fromName}" AND b.name="${toName}" WITH nodes(path) as pw RETURN pw , size(pw)  ORDER by size(pw)  `;
  foundedpathObj = [];
  obj = {};
  let cnt = [];
  var fragment = [];
  var globalFragments = [];
  const result = await session.run(phathQuery);

  if (result.records.length === 0) {
    return res.status(200).send({
      status: "We Dont handl this path yet please try again later",
    });
  }

  result.records.forEach(function (record, index) {
    obj = { ...obj, cnt };

    foundedpathObj.push(record._fields[0].map((item) => item.properties.name));
  });

  session.close();
  driver.close();

  await Promise.all(
    foundedpathObj.map(async (item, index) => {
      if (index === 0) {
        await returnFragment(item, fragment, globalFragments, index + 1);
      } else {
        setTimeout(async () => {
          await returnFragment(item, fragment, globalFragments, index + 1);
        }, 7000);
      }

      fragment = [];
    })
  );

  setTimeout(() => {
    globalFragments.filter((item) =>
      item.filter((item2) => item2.deliveryZone.length !== 0)
    );

    res.status(200).send({
      status: "successfully",
      path: globalFragments,
    });
  }, 5000);
});

// package Details
exports.addpackageDetails = catchAsync(async (req, res, next) => {});
exports.getAllpackageDetails = catchAsync(async (req, res, next) => {});
exports.getOnepackageDetails = catchAsync(async (req, res, next) => {});

// package Grooup
exports.addpackageGroup = catchAsync(async (req, res, next) => {});
exports.getAllpackageGroup = catchAsync(async (req, res, next) => {});
exports.getOnepackageGroup = catchAsync(async (req, res, next) => {});
