"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Levels",
      [
        {
          name: "junior",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "middle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "senior",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Levels", null, {});
  },
};
