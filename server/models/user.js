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
      user.hasMany(models.friendsRelations, { foreignKey: "userID" });
      user.hasMany(models.friendsRelations, { foreignKey: "friendUserID" });
      user.hasMany(models.myBooks, { foreignKey: "userID" });
      user.hasMany(models.myBooks, { foreignKey: "lendTo" });
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      googleAuth: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
