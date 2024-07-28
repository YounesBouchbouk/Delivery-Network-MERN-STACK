const { roles } = require("../utils/AcessControl");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const User = require("../model/UserModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        next(
          new AppError(
            "You don't have enough permission to perform this action",
            200
          )
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// PROTECTED ROUTE can only be accessed by LOGGEDIN users ////////////////////////////////////////////////////
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  // Authorization: Bearer {token}
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

  console.log(decoded.id);
  // 3) Check if user still exists(if deleted from DB or not)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token no longer exists.", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }

  // GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = currentUser; // storing user to the req
  next();
});
