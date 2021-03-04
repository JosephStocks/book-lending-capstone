const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/api", (req, res) => {
  res.send("I am an API.");
});

router.post("/addbook", async (req, res) => {
  console.log(req.body);
  //   await db.watchlists.create({
  //     userid: req.session.passport.user,
  //     movieid: movie.id,
  // });
  res.status(200).send("some text");
});

module.exports = router;
