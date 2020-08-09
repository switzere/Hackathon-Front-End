const router = require("express").Router();

router.route("/getCountries").get((req, res) => {
  console.log("getcountries");
  res.json({ ok: "ok" });
  //.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
