const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
  res.send("I am an API.");
});

module.exports = router;
