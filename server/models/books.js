"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.hasMany(models.OwnedBooks, { foreignKey: "bookID" });
      books.hasMany(models.ReadBooks, { foreignKey: "bookID" });
      books.hasMany(models.WantToReadBooks, { foreignKey: "bookID" });
    }
  }
  books.init(
    {
      title: DataTypes.STRING,
      authors: DataTypes.STRING,
      categories: DataTypes.STRING,
      isbn: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageLinks: DataTypes.TEXT,
      googleBookID: DataTypes.STRING,
      publisher: DataTypes.STRING,
      publishedDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};
