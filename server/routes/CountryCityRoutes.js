const express = require("express");
const router = express.Router();
const { grantAccess, protect } = require("../controllers/grantAccess");
const CountryCityCnt = require("../controllers/CountryCityCnt");

// Endpoint to get all city
router.get("/get/city/all", CountryCityCnt.getAllcities);

// Endpoint to get all country

router.get("/get/country/all", CountryCityCnt.getAllCountry);

router.use(protect);

// Endpoint to add new city
router.post("/add/city", CountryCityCnt.addOneCity);

// Endpoint to get  city by his ID

router.get("/get/city/:id", CountryCityCnt.getOneCity);

// Endpoint to remove  city by his ID

router.delete("/remove/city/:id", CountryCityCnt.removeOneCity);

// Endpoint to add new country

router.post("/add/country", CountryCityCnt.addOneCountry);

// Endpoint to remove  country by his ID
router.get("/get/country/:id", CountryCityCnt.getOneCountry);

// Endpoint to remove  country by his ID and it will remove all cities belong to this country

router.delete("/remove/country/:id", CountryCityCnt.removeOneCountry);

module.exports = router;
