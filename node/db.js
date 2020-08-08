// Using Node.js `require()`
const mongoose = require("mongoose");

const uri = process.env.client;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
