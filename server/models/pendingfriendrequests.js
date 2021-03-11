"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pendingFriendRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pendingFriendRequests.belongsTo(models.user, {
        foreignKey: "fromUserID",
      });
      pendingFriendRequests.belongsTo(models.user, { foreignKey: "toUserID" });
    }
  }
  pendingFriendRequests.init(
    {
      fromUserID: DataTypes.INTEGER,
      toUserID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pendingFriendRequests",
    }
  );
  return pendingFriendRequests;
};
