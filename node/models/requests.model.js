const mongoose = require("mongoose");

const countSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectID,
    Name: String,
    VisaFree: Array,
  },
  {
    collection: "Mexico",
    database: "Countries",
  }
);

module.exports = mongoose.model("Count", countSchema);
