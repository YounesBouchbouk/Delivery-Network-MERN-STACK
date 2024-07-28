const express = require("express");
const router = express.Router();
const AuthenticationCnt = require("../controllers/AuthControllers");
const { grantAccess, protect } = require("../controllers/grantAccess");

router.post(
  "/signup",
  AuthenticationCnt.signup,
  AuthenticationCnt.sendEmailVerificationToken
);
router.post("/login", AuthenticationCnt.login);
router.get("/signout", AuthenticationCnt.logout);
router.post("/adminregister", AuthenticationCnt.adminsignup);

router.post("/forgetpassword", AuthenticationCnt.forgotPassword);

router.post("/resetpassword/:token", AuthenticationCnt.resetPassword);

router.post(
  "/sendEmailVerificationToken",
  AuthenticationCnt.sendEmailVerificationToken
);

router.get("/emailValidation/:token", AuthenticationCnt.Emailvalidation);

router.use(protect); // All the routes(middlewares) after this middleware are protected

router.get(
  "/testuseronlypath",
  grantAccess("readAny", "profile"),
  (req, res, next) => {
    console.log(req.user.role);
    res.send("can delete any user");
  }
);

router.get(
  "/testcompaniesonlypath",
  AuthenticationCnt.restrictTO(["deliverycompanie"]),
  (req, res, next) => {
    res.send("deliverycompanie");
  }
);

module.exports = router;
