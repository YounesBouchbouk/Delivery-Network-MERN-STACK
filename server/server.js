const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Can't connect to DB");
});

connection.on("connected", () => {
  console.log("your app is now connected with DB");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("app is running");
});
