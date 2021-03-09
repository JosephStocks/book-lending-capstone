const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const {
  showAllOwnedBooksByUser,
  showAllReadBooksByUser,
  showAllWantToReadBooksByUser,
  findOrCreateBookEntry,
  findOrCreatePersonalListFunctionMapping,
} = require("../database/logic");
// auth
const passport = require("passport");
require("../auth/passAuth"); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate("jwt", { session: false });

// GET REQUESTS FOR PERSONAL LISTS
router.get("/ownedbooks", requireAuth, async (req, res) => {
  let userID = req.user.id;
  res.status(200).json(await showAllOwnedBooksByUser(userID));
});

router.get("/readbooks", requireAuth, async (req, res) => {
  let userID = req.user.id;
  res.status(200).json(await showAllReadBooksByUser(userID));
});

router.get("/wantbooks", requireAuth, async (req, res) => {
  let userID = req.user.id;
  res.status(200).json(await showAllWantToReadBooksByUser(userID));
});

// POST REQUESTS TO ADD TO PERSONAL LISTS
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

// DELETE REQUEST TO DELETE FROM PERSONAL LISTS
router.delete("/books", async (req, res) => {
  let result = deleteBookByAnyID(req.body);

  console.log(result);
  res.status(200).json(result);
});

module.exports = router;
