const db = require("../models");
const axios = require("axios");
const Sequelize = require("sequelize");

// Grabs all users matching search query except the user him/herself
const searchUsersFromDatabaseByNameOREmailEXCLUDEUserID = async (
  query,
  userID
) => {
  return await db.user.findAll({
    where: {
      [Sequelize.Op.or]: {
        namesQuery: Sequelize.where(
          Sequelize.fn(
            "concat",
            Sequelize.col("firstName"),
            " ",
            Sequelize.col("lastName")
          ),
          {
            [Sequelize.Op.iLike]: `%${query}%`,
          }
        ),
        email: { [Sequelize.Op.iLike]: `%${query}%` },
        googleAuth: { [Sequelize.Op.iLike]: `%${query}%` },
      },
      [Sequelize.Op.not]: {
        id: userID,
      },
    },
  });
};

const createPendingFriendRequest = async (userID, pendingFriendUserID) => {
  return await db.pendingFriendRequests.findOrCreate({
    where: {
      fromUserID: userID,
      toUserID: pendingFriendUserID,
    },
  });
};

const fetchSentFriendRequests = async (userID) => {
  return await db.pendingFriendRequests.findAll({
    where: {
      fromUserID: userID,
    },
    include: [
      {
        model: db.user,
      },
    ],
    raw: true,
  });
};

const fetchReceivedFriendRequests = async (userID) => {
  return await db.pendingFriendRequests.findAll({
    where: {
      toUserID: userID,
    },
    include: [
      {
        model: db.user,
      },
    ],
    raw: true,
  });
};

const fetchFriendsFromDatabase = async (userID) => {
  return await db.friendsRelations.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.user,
      },
    ],
    raw: true,
  });
};

const fetchUserFromDatabaseByLocalEmail = async (email) => {
  return await db.user.findAll({
    where: {
      email: email,
    },
    raw: true,
  });
};

const fetchUserFromDatabaseByGoogleAuthEmail = async (email) => {
  return await db.user.findAll({
    where: {
      googleAuth: email,
    },
    raw: true,
  });
};

module.exports.searchUsersFromDatabaseByNameOREmailEXCLUDEUserID = searchUsersFromDatabaseByNameOREmailEXCLUDEUserID;
module.exports.createPendingFriendRequest = createPendingFriendRequest;
module.exports.fetchSentFriendRequests = fetchSentFriendRequests;
module.exports.fetchReceivedFriendRequests = fetchReceivedFriendRequests;
module.exports.fetchFriendsFromDatabase = fetchFriendsFromDatabase;
module.exports.fetchUserFromDatabaseByLocalEmail = fetchUserFromDatabaseByLocalEmail;
module.exports.fetchUserFromDatabaseByGoogleAuthEmail = fetchUserFromDatabaseByGoogleAuthEmail;
