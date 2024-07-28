// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("sharedProfil")
    .readOwn("profile")
    .updateOwn("profile")
    .deleteOwn("profile");

  ac.grant("user")
    .extend("sharedProfil")
    .readOwn("courier")
    .createOwn("courier")
    .deleteOwn("courier")
    .updateOwn("courier")
    .readOwn("delivery")
    .createOwn("delivery")
    .deleteOwn("delivery")
    .updateOwn("delivery")
    .readAny("pricingMatrice")
    .readAny("pathmatrice")
    .readAny("deliveryCompanies");

  ac.grant("delivery")
    .extend("sharedProfil")
    .readOwn("delivery")
    .updateOwn("delivery")
    .readOwn("courier")
    .readAny("user")
    .readOwn("pricingMatrice")
    .createOwn("pricingMatrice")
    .updateOwn("pricingMatrice")
    .readOwn("pathmatrice")
    .createOwn("pathmatrice")
    .updateOwn("pathmatrice");

  ac.grant("admin")
    .extend(["user", "delivery"])
    .readAny("user")
    .deleteAny("user")
    .updateAny("user")
    .readAny("delivery")
    .updateAny("delivery")
    .deleteAny("delivery")
    .readAny("courier")
    .deleteAny("courier")
    .updateAny("courier")
    .readAny("path")
    .deleteAny("path")
    .createAny("City")
    .createAny("Country")
    .deleteAny("City")
    .deleteAny("Country");
  return ac;
})();
