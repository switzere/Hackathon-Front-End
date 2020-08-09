const router = require("express").Router();

router.route("/getCountries").get((req, res) => {
  console.log("getcountries");
  res.json({
    countries: [
      "Canada",
      "Japan",
      "Korea",
      "United States",
      "European Union",
      "Mexico",
    ],
  });
  //.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getCountryInfo").post((req, res) => {
  console.log("getCountryInfo");
  res.json({
    countries: [
      { country: "Canada", conversion: "1.13" },
      { country: "Japan", conversion: "2.1" },
      { country: "Korea", conversion: "??" },
      { country: "United States", conversion: "1.43" },
      { country: "European Union", conversion: ".84" },
    ],
  });
  //.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
