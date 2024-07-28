const User = require("../model/UserModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const { mailTransporter } = require("../utils/Mailer");

const creetoken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_TIMER,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = creetoken(user._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// SIGNUP ///////////////////////////////////////////////////////////////////////////////////////////////////
exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // for security let's remove unauthorized fields {active , role }
  if (
    (req.body.role && req.body.role === "admin") ||
    req.body.active ||
    req.body.valideEmail ||
    req.body.password
  ) {
    next(new AppError("nice try"));
  }

  const newuser = await User.create({
    ...req.body,
  });
  // createSendToken(newuser, 201, res);

  next();
});

// SIGNUP For ADMIN ///////////////////////////////////////////////////////////////////////////////////////////////////
exports.adminsignup = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const newuser = await User.create({
    ...req.body,
  });
  createSendToken(newuser, 201, res);

  //next();
});

// LOGIN ///////////////////////////////////////////////////////////////////////////////////////////////////
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
    // next(err)--> goes directly to the global error handler
  }

  // 2) check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password"); // because password: {select: false} in userModel

  // correctPassword is an instance method which will be available in all documents of a certain collection
  // user--> document
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  // 3) If everything is ok, send token to the client
  createSendToken(user, 200, res);
});

// LOGOUT //////////////////////////////////////////////////////////////////////////////////
exports.logout = catchAsync(async (req, res, next) => {
  // send cookie with same jwt, but without any token(null) and set the expire time in the past
  res.cookie("jwt", "null", {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

// ROUTE RESTRICTION (like delete route can only be accessed by admin) //////////////////////////////////////////
exports.restrictTO =
  (...roles) =>
  // roles--> REST OPERATOR
  (req, res, next) => {
    // roles--> ['admin', 'lead-guide']  if(role--> 'user') then no permission
    console.log(req.user.role);
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  if (!user.active) {
    return next(new AppError("Your Account is not activited yet", 400));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `http://localhost:3000/newpassword/${resetToken}`;
  console.log(resetURL);
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await mailTransporter.sendMail({
      from: "younss.india@gmail.com",
      to: "younesbouchbouk.py@gmail.com",
      subject: "Your password reset token (valid for 10 min)",
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  if (!user.active) {
    return next(new AppError("Your Account is not activited yet", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

//Email Varification Send Token
exports.sendEmailVerificationToken = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const EmailToken = user.createEmailVerevicationToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `http://localhost:3000/emailconfirmation/${EmailToken}`;
  console.log(resetURL);
  const message = `Please Click the link to verfier your Email to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await mailTransporter.sendMail({
      from: "younss.india@gmail.com",
      to: "younesbouchbouk.py@gmail.com",
      subject:
        "Mercie pour l'iscription , pouvez vous confirmé votre email adress",
      text: message,
    });

    res.status(200).json({
      status: "success",

      user,
    });
  } catch (err) {
    user.emailValidationToken = undefined;
    user.emailValidationExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.Emailvalidation = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    emailValidationToken: hashedToken,
    emailValidationExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user,
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.valideEmail = true;

  user.emailValidationToken = undefined;
  user.emailValidationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    msg: "We have succussefuly validate your email",
  });
});
