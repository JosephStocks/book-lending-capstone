const db = require("../models");
const axios = require("axios");
const Sequelize = require("sequelize");

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

const searchUsersFromDatabaseByNameOREmail = async (query) => {
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
    },
  });
};

module.exports.fetchFriendsFromDatabase = fetchFriendsFromDatabase;
module.exports.fetchUserFromDatabaseByLocalEmail = fetchUserFromDatabaseByLocalEmail;
module.exports.fetchUserFromDatabaseByGoogleAuthEmail = fetchUserFromDatabaseByGoogleAuthEmail;
module.exports.searchUsersFromDatabaseByNameOREmail = searchUsersFromDatabaseByNameOREmail;
