"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    //we add colum userId into DB table Courses
    await queryInterface.addColumn("Courses", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Courses", "languageId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Languages", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Courses", "levelId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Levels", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Comments", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Comments", "courseId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Courses", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("UsersParticipants", "courseId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Courses", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("UsersParticipants", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // we references here on DB table Users
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Languages", "imageUrl", {
      type: Sequelize.STRING,

      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Courses", "userId");
    await queryInterface.removeColumn("Courses", "languageId");
    await queryInterface.removeColumn("Courses", "levelId");
    await queryInterface.removeColumn("Comments", "userId");
    await queryInterface.removeColumn("Comments", "courseId");
    await queryInterface.removeColumn("UsersParticipants", "userId");
    await queryInterface.removeColumn("UsersParticipants", "courseId");
    await queryInterface.removeColumn("Languages", "imageUrl");
  },
};
