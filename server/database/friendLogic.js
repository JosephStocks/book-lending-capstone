const db = require("../models");
const axios = require("axios");
const Sequelize = require("sequelize");

// Grabs all users matching search query except the user him/herself
const searchUsersFromDatabaseByNameOREmailEXCLUDEUserID = async (
  query,
  userID
) => {
  query = query.trim();
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
        as: "receiver",
        model: db.user,
        attributes: ["firstName", "lastName", "email", "googleAuth"],
      },
    ],
    raw: true,
  });
};

const cleanSentFriendRequestObjects = (sentFriendRequests) => {
  return sentFriendRequests.map((request) => {
    let {
      fromUserID,
      toUserID,
      "receiver.firstName": toUserFirstName,
      "receiver.lastName": toUserLastName,
      "receiver.email": toUserEmail,
      "receiver.googleAuth": toUserGoogleAuth,
    } = request;
    // use the google auth email if this person never logged in locally with the same email
    if (toUserEmail == null || toUserEmail.length === 0) {
      toUserEmail = toUserGoogleAuth;
    }
    return {
      fromUserID,
      toUserID,
      toUserFirstName,
      toUserLastName,
      toUserEmail,
    };
  });
};

const fetchReceivedFriendRequests = async (userID) => {
  return await db.pendingFriendRequests.findAll({
    where: {
      toUserID: userID,
    },
    include: [
      {
        as: "sender",
        model: db.user,
        attributes: ["firstName", "lastName", "email", "googleAuth"],
      },
    ],
    raw: true,
  });
};

const cleanReceivedFriendRequestObjects = (sentFriendRequests) => {
  return sentFriendRequests.map((request) => {
    let {
      fromUserID,
      toUserID,
      "sender.firstName": fromUserFirstName,
      "sender.lastName": fromUserLastName,
      "sender.email": fromUserEmail,
      "sender.googleAuth": fromUserGoogleAuth,
    } = request;
    // use the google auth email if this person never logged in locally with the same email
    if (fromUserEmail == null || fromUserEmail.length === 0) {
      fromUserEmail = fromUserGoogleAuth;
    }
    return {
      toUserID,
      fromUserID,
      fromUserFirstName,
      fromUserLastName,
      fromUserEmail,
    };
  });
};

const acceptPendingFriendRequest = async (userID, friendRequestSenderID) => {
  // 1. Delete from pending friend request list where 'fromUserID' = friendRequestSenderID AND 'toUserID' = userID
  let response = await db.pendingFriendRequests.destroy({
    where: {
      fromUserID: friendRequestSenderID,
      toUserID: userID,
    },
  });
  console.log("destroy");
  console.log(response);
  // 2. Create entry in friendRelations table: 'userID' = userID AND 'friendUserID' = friendRequestSenderID
  response = await db.friendsRelations.create({
    userID: friendRequestSenderID,
    friendUserID: userID,
  });
  console.log("create1");
  console.log(response);
  // 3. Create entry in friendRelations table in opposite directoin: 'userID' = friendRequestSenderID AND 'friendUserID' = userID
  response = await db.friendsRelations.create({
    userID: userID,
    friendUserID: friendRequestSenderID,
  });
  console.log("create2");
  console.log(response);
};

const fetchFriendsFromDatabase = async (userID) => {
  return await db.friendsRelations.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.user,
        include: {
          as: "owner",
          model: db.OwnedBooks,
          include: {
            model: db.books,
          },
        },
      },
    ],
    // raw: true,
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
module.exports.cleanSentFriendRequestObjects = cleanSentFriendRequestObjects;
module.exports.fetchReceivedFriendRequests = fetchReceivedFriendRequests;
module.exports.cleanReceivedFriendRequestObjects = cleanReceivedFriendRequestObjects;
module.exports.acceptPendingFriendRequest = acceptPendingFriendRequest;
module.exports.fetchFriendsFromDatabase = fetchFriendsFromDatabase;
module.exports.fetchUserFromDatabaseByLocalEmail = fetchUserFromDatabaseByLocalEmail;
module.exports.fetchUserFromDatabaseByGoogleAuthEmail = fetchUserFromDatabaseByGoogleAuthEmail;
