const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let Count = require("../models/requests.model");

router.route("/getCountries").get(function (req, res) {
  console.log("getcountries");
  // res.json({
  //   countries: [
  //     "Canada",
  //     "Japan",
  //     "Korea",
  //     "United_States",
  //     "European_Union",
  //     "Mexico",
  //   ],
  // });
  // //.catch((err) => res.status(400).json("Error: " + err));
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      ret = [];
      names.forEach(function (e, i, a) {
        //mongoose.connection.db.dropCollection(e.name);
        //console.log("--->>>", e.name);
        ret.push(e.name);
      });
      res.status(200).json(ret);
    }
  });
});

router.route("/:country").get(function (req, res) {
  console.log("HERE");
  var collection = mongoose.connection.db.collection(req.params.country);
  collection.find().toArray(function (err, items) {
    res.status(200).json(items);
  });
});

// router.route("/getCountryInfo").post((req, res) => {
//   console.log("getCountryInfo");
//   res.json({
//     countries: [
//       { country: "Canada", conversion: "1.13" },
//       { country: "Japan", conversion: "2.1" },
//       { country: "South_Korea", conversion: "??" },
//       { country: "United_States", conversion: "1.43" },
//       { country: "South_Korea", conversion: "??" },
//     ],
//   });
//   //.catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
