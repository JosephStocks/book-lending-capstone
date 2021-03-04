"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OwnedBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OwnedBooks.belongsTo(models.user, { foreignKey: "userID" });
      OwnedBooks.belongsTo(models.books, { foreignKey: "bookID" });
      OwnedBooks.belongsTo(models.user, { foreignKey: "lendToID" });
    }
  }
  OwnedBooks.init(
    {
      userID: DataTypes.INTEGER,
      bookID: DataTypes.INTEGER,
      lendToID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OwnedBooks",
    }
  );
  return OwnedBooks;
};
