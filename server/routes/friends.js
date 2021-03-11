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



module.exports = router;