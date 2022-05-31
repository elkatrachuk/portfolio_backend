"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "The course is basics and I would highly recommended for the beginners to get their feet wet with java script.",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          courseId: 1,
        },
        {
          text: "Angela is a great teacher and I have taken some other courses of hers. This one seems to be of the same great quality. If you want a simple code-along, this is not for you.",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          courseId: 2,
        },
        {
          text: "I'm really learning a LOT. To be honest some topics are extensive, and sometimes too heavy on detail (and a bit boring at first), but if you insist, Tim always finds a way to make it interesting again.",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 4,
          courseId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
