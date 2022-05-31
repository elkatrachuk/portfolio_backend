"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Languages",
      [
        {
          name: "JavaScript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Python",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Swift",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Java",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rybu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "C#",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
