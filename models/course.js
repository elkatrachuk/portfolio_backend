"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.User, { foreignKey: "userId", as: "author" });
      Course.belongsToMany(models.User, {
        foreignKey: "courseId",
        through: "UsersParticipants",
        as: "participant",
      });
      Course.belongsTo(models.Language, { foreignKey: "languageId" });
      Course.belongsTo(models.Level, { foreignKey: "levelId" });
      Course.hasMany(models.Comment, { foreignKey: "courseId" });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
