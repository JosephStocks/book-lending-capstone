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
  showUsersWhoOwnBook,
} = require("../database/bookLogic");
// auth
const passport = require("passport");
require("../auth/passAuth"); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate("jwt", { session: false });

// GET REQUESTS FOR PERSONAL LISTS
router.get("/ownedbooks", requireAuth, async (req, res) => {
  try {
    let response = await showAllOwnedBooksByUser(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/readbooks", requireAuth, async (req, res) => {
  try {
    let response = await showAllReadBooksByUser(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/wantbooks", requireAuth, async (req, res) => {
  try {
    let response = await showAllWantToReadBooksByUser(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST REQUESTS TO ADD TO PERSONAL LISTS
router.post("/books", requireAuth, async (req, res) => {
  try {
    let { book, whichList } = req.body;
    let userID = req.user.id;

    let response = await findOrCreateBookEntry(book);
    let bookID = response.dataValues.id;

    response = await findOrCreatePersonalListFunctionMapping[whichList](
      userID,
      bookID
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE REQUEST TO DELETE FROM PERSONAL LISTS
router.delete("/books", async (req, res) => {
  try {
    let response = deleteBookByAnyID(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// requireAuth,
router.post("/whoownsit", async (req, res) => {
  try {
    let records = await showUsersWhoOwnBook(req.body.bookID);

    let book = {};
    let allOwners = [];
    if (records != null && records.length !== 0) {
      book = records[0].book;
      allOwners = records.map((ownerEntry) => ownerEntry.owner);
    }

    res.status(200).json({ book, allOwners });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
