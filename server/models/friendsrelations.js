"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class friendsRelations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      friendsRelations.belongsTo(models.user, { foreignKey: "userID" });
      friendsRelations.belongsTo(models.user, { foreignKey: "friendUserID" });
    }
  }
  friendsRelations.init(
    {
      userID: DataTypes.INTEGER,
      friendUserID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "friendsRelations",
    }
  );
  return friendsRelations;
};
