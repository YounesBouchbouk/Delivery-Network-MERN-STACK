const User = require("../model/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary");

exports.getMeById = catchAsync(async (req, res, next) => {
  const userid = req.params.userid;
  const user = await User.findById(userid);
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  res.status(200).send({
    user,
  });
});

exports.disableAccount = catchAsync(async (req, res, next) => {
  const id = req.params.userid;
  const user = await User.findById(id).select("+ password");
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }
  if (!user.active) {
    return next(new AppError("User Already disabled", 404));
  }

  user.active = false;
  //user.password = null;

  await user.save({ validateBeforeSave: false });

  res.status(200).send({
    status: "done",
    user,
  });
});

exports.ActiveUserAccount = catchAsync(async (req, res, next) => {
  const id = req.params.userid;

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  //check if user account is already active
  if (user.active) {
    return next(new AppError("User Already active", 404));
  }

  //check if the user account was active and he cget the password
  if (!user.password) {
    //generate a new password in case first time activated
    const unhashedpassword = user.generateAndSavePassword();
    // 3) Send it to user's email
    const message = `Nous avons activé votre compte ,  le mote de pass est :  ${unhashedpassword}.`;
    await mailTransporter.sendMail({
      from: "younss.india@gmail.com",
      to: "younesbouchbouk.py@gmail.com",
      subject: "Nous Avons Activez votre compte",
      text: message,
    });
  }

  //active
  user.active = true;

  //save
  await user.save({ validateBeforeSave: false });

  //set password to undefined for securityc
  user.password = undefined;

  res.status(200).json({
    status: "success",
    message: "Password  sent to email!",
    user,
  });
});

exports.listAccount = catchAsync(async (req, res, next) => {
  const featureApi = new APIFeatures(
    User.find({ role: { $ne: "admin" } }),
    req.query
  )
    .pagination()
    .filter()
    .limitFields()
    .sort();

  //for pagination fix preblem of number of user par role to dispaly pagination bar

  if (req.query.role) {
    console.log(req.query.role);
    total = await User.countDocuments({
      role: { $in: [req.query.role] },
    });
  } else {
    total = await User.countDocuments({
      role: { $ne: "admin" },
    });
  }

  //check if we over the nombre of pages
  if (req.query.page) {
    const skip = (req.query.page - 1) * req.query.limit;
    if (skip > total) {
      next(new AppError("cette page n'exist pas"));
    }
  }
  const List = await featureApi.query;

  res.status(200).send({
    total,
    status: "done",
    List,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    next(new AppError("user not found", 401));
  }

  res.status(200).send({
    status: "successfuly",
    user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password, passwordConfirm, businessinfo } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  //check if companie has changed his business info
  if (businessinfo) {
    if (businessinfo.Adress && businessinfo.Adress !== "")
      user.businessinfo.Adress = businessinfo.Adress;
    if (businessinfo.city && businessinfo.city !== "")
      user.businessinfo.city = businessinfo.city;
    if (businessinfo.phone && businessinfo.phone !== "")
      user.businessinfo.phone = businessinfo.phone;
  }

  if (email && email !== "") {
    if (
      password &&
      password !== "" &&
      passwordConfirm &&
      passwordConfirm !== ""
    ) {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.email = email;
      user.valideEmail = false;
      await user.save({ validateBeforeSave: true });
      next();
    } else {
      user.email = email;
      user.valideEmail = false;
      await user.save({ validateBeforeSave: true });
      next();
    }
  } else if (password && password !== "") {
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save({ validateBeforeSave: true });
    user.password = undefined;
    res.status(200).send({
      status: "successfuly",
      user,
    });
  } else {
    await user.save({ validateBeforeSave: true });
    return res.status(200).send({
      status: "successfuly",
      user,
    });
  }
});

exports.getOne = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    next(new AppError("user not found", 401));
  }

  res.status(201).send({
    status: "successfuly",
    user,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const users = await User.find({})
    .populate("deliveryzones")
    .populate({
      path: "deliveryzones",
      populate: [
        {
          path: "delivery_service",
          model: "User",
          select: "name",
        },
      ],
    });
  if (!users) {
    next(new AppError("user not found", 401));
  }

  res.status(201).send({
    users,
  });
});

exports.uploadimage = catchAsync(async (req, res, next) => {
  const { user } = req;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_USER_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const result = await cloudinary.uploader.upload(req.file.path, {
    public_id: `${user._id}_profile`,
    resource_type: "jpg",
  });

  // console.log(result);
  await User.findByIdAndUpdate(user._id, { Avatar: result.url });

  res.status(200).send({
    status: "successfully",
    file: result.url,
  });
});
