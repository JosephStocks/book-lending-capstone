const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const {
  fetchFriendsFromDatabase,
  searchUsersFromDatabaseByNameOREmailEXCLUDEUserID,
  createPendingFriendRequest,
  fetchUserFromDatabaseByLocalEmail,
  fetchUserFromDatabaseByGoogleAuthEmail,
} = require("../database/friendLogic");
// auth
const passport = require("passport");
require("../auth/passAuth"); //import all of passport auth strategy

// jwt auth
let requireAuth = passport.authenticate("jwt", { session: false });

// Search for potential friends by name or local email or google email
router.post("/users", requireAuth, async (req, res) => {
  try {
    console.log(req.body.searchQuery);
    let records = await searchUsersFromDatabaseByNameOREmailEXCLUDEUserID(
      req.body.searchQuery,
      req.user.id
    );
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/friends/pending", requireAuth, async (req, res) => {
  try {
    let response = await createPendingFriendRequest(
      req.user.id,
      req.body.pendingFriendUserID
    );
    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/friends/pending", requireAuth, async (req, res) => {
  try {
    let sentRequests = await fetchSentFriendRequests(req.user.id);
    let receivedRequests = await fetchReceivedFriendRequests(req.user.id);
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
