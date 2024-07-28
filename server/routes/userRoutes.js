const express = require("express");
const router = express.Router();
const userCnt = require("../controllers/Usercontrollers");
const { grantAccess, protect } = require("../controllers/grantAccess");
const AuthControllers = require("../controllers/AuthControllers");
const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });

router.get("/admin/getAll", userCnt.getAll);

router.use(protect);
router.get(
  "/activer/:userid",
  grantAccess("updateAny", "user"),
  userCnt.ActiveUserAccount
);
router.get(
  "/desactive/:userid",
  grantAccess("updateAny", "user"),
  userCnt.disableAccount
);

router.get("/disabledusers", userCnt.listAccount);
router.get("/getUser/:userId", userCnt.getOne);
router.get("/getMe", userCnt.getMe);
router.post(
  "/upload/user/avatar",
  uploads.single("profile"),
  userCnt.uploadimage
);
router.post(
  "/updateMe",
  userCnt.updateMe,
  AuthControllers.sendEmailVerificationToken
);
module.exports = router;
