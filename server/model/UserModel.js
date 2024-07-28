const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name "],
    minlength: [3, "User name must have at least 3 characters"],
    maxlength: [28, "User name must have at most 28 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  valideEmail: {
    type: Boolean,
    default: false,
  },
  Avatar: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin", "deliverycompanie", "collector"],
    default: "user",
  },
  phone: {
    type: [String],
  },
  businessname: {
    type: String,
  },
  headquarter: {
    Adress: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  moreAdress: [
    {
      Street: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
    },
  ],
  profileComplited: {
    type: Boolean,
    default: false,
  },
  workingDays: {
    Monday: Boolean,
    Tuesday: Boolean,
    Wednesday: Boolean,
    Thursday: Boolean,
    Friday: Boolean,
    Saturday: Boolean,
    Sunday: Boolean,
  },

  password: {
    type: String,
    // required: [true, "Please provide a password"],
    minlength: [8, "Password must have atleast 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // This only works on CREATE() and SAVE()!!!
      validator: function (val) {
        return this.password === val;
      },
      message: "Password does not match",
    },
  },
  CreatedAt: {
    type: Date,
    default: new Date(),
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailValidationToken: String,
  emailValidationExpires: Date,
  active: {
    type: Boolean,
    default: false,
    select: true,
  },
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// FIXME
userSchema.virtual("deliveryzones", {
  ref: "DeliveryZone",
  foreignField: "delivery_service",
  localField: "_id",
});

userSchema.pre(/^find/, function (next) {
  this.sort({ CreatedAt: 1 });
  next();
});
// Mongoose document pre MIDDLEWARE(pre--> because password needs to be hashed before saving to the database) //////////////
userSchema.pre("save", async function (next) {
  // Only run this function if the password is modified
  if (!this.isModified("password")) return next();

  // Hash the password with saltround = 12
  if (this.password !== null)
    this.password = await bcrypt.hash(this.password, 12); // returns promise

  // Delete the passwordConfirm field from Database
  this.passwordConfirm = undefined;
  next();
});

//Schema function to generate  password for user and avtivate his account
userSchema.methods.generateAndSavePassword = function () {
  //generat a random password
  let oldpassword = Array(15)
    .fill(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@-[]()"
    )
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join("");

  //save it and set account status to  true
  this.password = oldpassword;
  //this.active = true;

  //return the unhashed password to the controller to send it to user after
  return oldpassword;
};
// To modify the passwordChangedAt property after password reset ///////////////////////////////////////////////////
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // the timestamp is created a little bit late, so we reduced 1 second
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  // candidatePassword--> input password
  // userPassword--> hashed password
  return await bcrypt.compare(candidatePassword, userPassword);
};

// To create password reset token /////////////////////////////////////////////////////////////////////////
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // creates random token

  // hash the reset token--> to store in Database
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds

  // return the original(unencrypted) token to the user via email--> resetToken
  // But in our Database store encrypted token--> passwordResetToken
  return resetToken;
};

userSchema.methods.createEmailVerevicationToken = function () {
  const validationToken = crypto.randomBytes(32).toString("hex"); // creates random token

  // hash the reset token--> to store in Database
  this.emailValidationToken = crypto
    .createHash("sha256")
    .update(validationToken)
    .digest("hex");

  this.emailValidationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds

  // return the original(unencrypted) token to the user via email--> resetToken
  // But in our Database store encrypted token--> passwordResetToken
  return validationToken;
};

// To check if the password is changed after receiving token /////////////////////////////////////////////////////////
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }
  // false means not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
