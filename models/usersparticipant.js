"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersParticipant.hasMany(models.User, { foreignKey: "userId" });
      UsersParticipant.hasMany(models.Course, { foreignKey: "courseId" });
    }
  }
  UsersParticipant.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersParticipant",
    }
  );
  return UsersParticipant;
};
