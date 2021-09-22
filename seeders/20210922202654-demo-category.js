"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = [
      {
        name: "Design",
      },
      {
        name: "Programming",
      },
      {
        name: "Music",
      },
      {
        name: "Lifestyle",
      },
      {
        name: "Finance",
      },
      {
        name: "Marketing",
      },
      {
        name: "Photography",
      },
    ];

    data.forEach((e) => {
      e.createdAt = new Date();
      e.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Categories", data);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
