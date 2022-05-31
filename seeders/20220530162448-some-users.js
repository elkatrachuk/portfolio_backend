"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "testuser",
          email: "test@test.com",
          password: "test1234",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAuthor: true,
          avatar: "https://img-b.udemycdn.com/user/200_H/36659036_5480_2.jpg",
          description: ` Tony has been programming since he was 12 years old, and got into web sites and web application development at 16. After graduating with a Computer Science degree from Case Western Reserve University, Tony continued with that interest as a Microsoft certified software application developer and architect, database designer, and user interface designer.
          His experience has ranged across technologies such as HTML5, CSS3, ASP .NET MVC, JavaScript, jQuery, KnockoutJS, AngularJS, NodeJS, LESS, Bootstrap, SQL, Entity Framework and more. `,
        },
        {
          name: "elochka",
          email: "n@gmail.com",
          password: "test5678",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAuthor: false,
        },
        {
          name: "Margarita",
          email: "rmd@gmail.com",
          password: "test1111",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAuthor: false,
        },
        {
          name: "Lana",
          email: "n4@gmail.com",
          password: "test2222",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAuthor: false,
        },
        {
          name: "Artem",
          email: "test55@test.com",
          password: "test3333",
          createdAt: new Date(),
          updatedAt: new Date(),
          isAuthor: true,
          avatar: "https://img-b.udemycdn.com/user/200_H/10260436_946b_6.jpg",
          description: ` Avinash Jain is currently a senior at UC Berkeley majoring in Electrical Engineering and Computer Science. He's the CEO and Founder of TheCodex, an online educational platform focused on bringing the best programming content to hundreds of thousands of students around the world.`,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
