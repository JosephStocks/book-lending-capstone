const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const {
  fetchFriendsFromDatabase,
  searchUsersFromDatabaseByNameOREmail,
  fetchUserFromDatabaseByLocalEmail,
  fetchUserFromDatabaseByGoogleAuthEmail,
} = require("../database/friendLogic");
// auth
const passport = require("passport");
require("../auth/passAuth"); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate("jwt", { session: false });

// Search for potential friends by name or local email or google email
router.get("/users/:searchquery", requireAuth, async (req, res) => {
  try {
    let records = await searchUsersFromDatabaseByNameOREmail(
      req.params.searchQuery
    );
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/friends", requireAuth, async (req, res) => {
  try {
    let response = await fetchFriendsFromDatabase(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/friends", requireAuth, async (req, res) => {
  try {
    let response = await fetchFriendsFromDatabase(req.user.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
