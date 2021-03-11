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

router.post("/books", requireAuth, async (req, res) => {
  let { book, whichList } = req.body;
  let userID = req.user.id;

  let response = await findOrCreateBookEntry(book);
  console.log(Object.keys(response));
  let bookID = response.dataValues.id;

  response = await findOrCreatePersonalListFunctionMapping[whichList](
    userID,
    bookID
  );

  // console.log(response);
  res.status(200).json(response);
});

module.exports = router;
