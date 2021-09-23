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
    await queryInterface.bulkInsert(
      "Communities",
      [
        {
          name: "Sport",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Job",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fashion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Communities", null, {});
  },
};
