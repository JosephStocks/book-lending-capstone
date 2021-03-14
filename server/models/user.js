"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.friendsRelations, {
        foreignKey: "userID",
      });
      user.hasMany(models.friendsRelations, {
        foreignKey: "friendUserID",
      });
      user.hasMany(models.OwnedBooks, { as: "owner", foreignKey: "userID" });
      user.hasMany(models.OwnedBooks, {
        as: "borrower",
        foreignKey: "lendToID",
      });
      user.hasMany(models.ReadBooks, { foreignKey: "userID" });
      user.hasMany(models.WantToReadBooks, { foreignKey: "userID" });
      user.hasMany(models.pendingFriendRequests, {
        as: "sender",
        foreignKey: "fromUserID",
      });
      user.hasMany(models.pendingFriendRequests, {
        as: "receiver",
        foreignKey: "toUserID",
      });
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      googleAuth: DataTypes.STRING,
      jwtToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
