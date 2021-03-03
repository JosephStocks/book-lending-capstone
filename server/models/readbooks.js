"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ReadBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReadBooks.belongsTo(models.user, { foreignKey: "userID" });
      ReadBooks.belongsTo(models.booksTable, { foreignKey: "bookID" });
    }
  }
  ReadBooks.init(
    {
      userID: DataTypes.INTEGER,
      bookID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReadBooks",
    }
  );
  return ReadBooks;
};
