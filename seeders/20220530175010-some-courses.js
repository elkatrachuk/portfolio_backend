"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          title: "JavaScript Basics for Beginners",
          description: `WHAT IS JAVASCRIPT? 
          JavaScript is one of the most popular programming languages in the world, and growing faster than any other programming language. As a developer, you can use JavaScript to build web and mobile apps, real-time networking apps, command-line tools, and games.`,
          imageUrl:
            "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg",
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          levelId: 1,
          languageId: 1,
        },
        {
          title: "Learn Python: The Complete Python Programming Course",
          description: `Python has rapidly become one of the most popular programming languages around the world. Compared to other languages such as Java or C++, Python consistently outranks and outperforms these languages in demand from businesses and job availability. The average Python developer makes over $100,000 - this number is only going to grow in the coming years.`,
          imageUrl:
            "https://www.ct.nl/app/uploads/2020/12/Python-programmeren-taal-programmeertaal-AI-beginner.png",
          rating: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          levelId: 2,
          languageId: 2,
        },
        {
          title: "Java Programming Masterclass covering Java 11 & Java 17",
          description: `ouve just stumbled upon the most complete, in-depth Java programming course online. With close to 600,000 students enrolled and over one hundred and forty thousand reviews (with tens of thousands of those 5-star) to date, these comprehensive java tutorials cover everything you’ll ever need.`,
          imageUrl:
            "https://miro.medium.com/max/1400/1*iIXOmGDzrtTJmdwbn7cGMw.png",
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          levelId: 3,
          languageId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
