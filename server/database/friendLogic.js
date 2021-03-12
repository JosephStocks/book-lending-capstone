const db = require("../models");
const axios = require("axios");

const fetchFriendsFromDatabase = async (userID) => {
  return await db.friendsRelations.findAll({
    where: {
      userID: userID,
    },
    include: [
      {
        model: db.books,
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
      [Op.or]: {
        namesQuery: sequelize.where(
          sequelize.fn(
            "concat",
            sequelize.col("firstName"),
            " ",
            sequelize.col("lastName")
          ),
          {
            [Op.ilike]: `%${query}%`,
          }
        ),
        email: { [Op.ilike]: `%${query}%` },
        googleAuth: { [Op.ilike]: `%${query}%` },
      },
    },
  });
};

module.exports.fetchFriendsFromDatabase = fetchFriendsFromDatabase;
module.exports.fetchUserFromDatabaseByLocalEmail = fetchUserFromDatabaseByLocalEmail;
module.exports.fetchUserFromDatabaseByGoogleAuthEmail = fetchUserFromDatabaseByGoogleAuthEmail;
module.exports.searchUsersFromDatabaseByNameOREmail = searchUsersFromDatabaseByNameOREmail;
