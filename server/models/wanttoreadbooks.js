"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WantToReadBooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WantToReadBooks.belongsTo(models.user, { foreignKey: "userID" });
      WantToReadBooks.belongsTo(models.booksTable, { foreignKey: "bookID" });
    }
  }
  WantToReadBooks.init(
    {
      userID: DataTypes.INTEGER,
      bookID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WantToReadBooks",
    }
  );
  return WantToReadBooks;
};
