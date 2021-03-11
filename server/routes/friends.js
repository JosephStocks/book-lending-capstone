const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const { dummyFunction } = require("../database/friendLogic");
// auth
const passport = require("passport");
require("../auth/passAuth"); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate("jwt", { session: false });

router.post("/friends", requireAuth, async (req, res) => {
  try {
    let response = await dummyFunction(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
