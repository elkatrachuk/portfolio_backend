"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Course, { foreignKey: "userId", as: "author" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      // User.belongsToMany(models.Course, {
      //   through: "UsersParticipants",
      //   foreignKey: "userId",
      //   as: "participants",
      // });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAuthor: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
