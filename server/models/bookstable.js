"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class booksTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      booksTable.hasMany(models.OwnedBooks, { foreignKey: "bookID" });
      booksTable.hasMany(models.ReadBooks, { foreignKey: "bookID" });
      booksTable.hasMany(models.WantToReadBooks, { foreignKey: "bookID" });
    }
  }
  booksTable.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      category: DataTypes.STRING,
      isbn: DataTypes.INTEGER,
      description: DataTypes.STRING,
      imageLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "booksTable",
    }
  );
  return booksTable;
};
