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
  deleteFromPersonalListFunctionMapping,
  showUsersWhoOwnBook,
  showUsersWhoOwnBookByGoogleID,
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
router.delete("/books", requireAuth, async (req, res) => {
  try {
    console.log("INSIDE DELETE");
    console.log(req.body.whichList);
    console.log(req.body.bookID);
    console.log(req.user.id);
    let response = await deleteFromPersonalListFunctionMapping[
      req.body.whichList
    ](req.user.id, req.body.bookID);
    console.log("RESPONSE");
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/whoownsit", requireAuth, async (req, res) => {
  try {
    let book = {};
    let allOwners = [];
    let records;
    console.log(req.body);
    if (req.body.whichID === "google") {
      console.log(req.body.bookID);
      records = await showUsersWhoOwnBookByGoogleID(req.body.bookID);
      records = records[0].OwnedBooks;
    } else {
      records = await showUsersWhoOwnBook(req.body.bookID);
      console.log("req.user.id");
      console.log(req.user.id);
    }

    if (records != null && records.length !== 0) {
      book = records[0].book;
      // allOwners = records.map((ownerEntry) => ownerEntry.owner);
      // map to users while filtering out results for current user
      allOwners = records.reduce(function (filtered, ownerEntry) {
        if (ownerEntry.owner.id !== req.user.id) {
          filtered.push(ownerEntry.owner);
        }
        return filtered;
      }, []);
    }

    res.status(200).json({ book, allOwners });
  } catch (err) {
    console.log(err.message);
    res.status(200).json({ book: {}, allOwners: [] });
  }
});

module.exports = router;
