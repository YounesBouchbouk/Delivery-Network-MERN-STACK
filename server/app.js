const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/globalErrorHandler");
const AppError = require("./utils/appError");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const AuthRoute = require("./routes/AuthRoute");
const userRoutes = require("./routes/userRoutes");
const cityCountryRoutes = require("./routes/CountryCityRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const shippingRoute = require("./routes/shippingRoute");
const adminRoutes = require("./routes/adminRoutes");
const packesRoute = require("./routes/packagesRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
  process.env.NEO4J_HOST,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

//swagger
//*****swagger docs configuration */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Delivery Network API",
      version: "1.0.0",
      description: "Delivery Network RestFull API using mongodb expressjs  ",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./swaggerDocs/*.js"],
};

const specs = swaggerJsDoc(options);

//link .env variales with our app
dotenv.config({
  path: "./config.env",
});

const app = express();

// dbRemote.query("MATCH(n:City) RETURN(n)", function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
//use morgane to print any request on our terminal
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// swagger ui route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// 3) ROUTES
app.use("/api/v1/authentication/users", AuthRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cityandcountry", cityCountryRoutes);
app.use("/api/v1/delivery", deliveryRoutes);
app.use("/api/v1/shipping", shippingRoute);
app.use("/api/v1/foradmin", adminRoutes);
app.use("/api/v1/packages/gestion", packesRoute);
app.use("/api/v1/shipment", shipmentRoutes);

app.get("/testneo4", function (req, res, next) {
  var session = driver.session();
  var query = "MATCH(n) RETURN (n)";
  const phathQuery =
    'MATCH path = (a:City)-[*]-(b:City) WHERE a.name = "Agadir" AND b.name="Tanger" WITH nodes(path) as pw RETURN pw , size(pw)  ORDER by size(pw)  ';
  let foundedpath = [];
  let foundedpathObj = {};
  session
    .run(phathQuery)
    .then(function (result) {
      result.records.forEach(function (record, index) {
        console.log(index);
        // console.log(record._fields[0]);
        foundedpathObj = {
          ...foundedpathObj,
          [index + 1]: record._fields[0].map((item) => item.properties.name),
        };
        // foundedpath.push(record._fields[0].map((item) => item.properties.name));
      });

      session.close();
      driver.close();

      res.status(200).send({
        foundedpathObj,
      });
    })
    .catch(function (error) {
      console.log(error);
      driver.close();
    });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

// const operation = dbRemote.operation("node/2/properties");
// dbRemote.call(operation, function (err, properties) {
//   if (err) throw err;
//   console.log(properties);
//   // `properties` is an object containing the properties from node 4285
// });

// GLOBAL ERROR HANDLING MIDLEWARE
app.use(globalErrorHandler);
module.exports = app;
