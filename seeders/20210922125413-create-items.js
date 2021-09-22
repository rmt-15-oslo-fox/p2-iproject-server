'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Items", [{
      title: "Football",
      description: "It's a different definition between USA and UK",
      tag: "Sport",
      UserId: 1,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Testing",
      description: "Testing",
      tag: "Sport",
      UserId: 1,
      status: "Inactive",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Testing",
      description: "Testing",
      tag: "Politic",
      UserId: 1,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Testing",
      description: "Testing",
      tag: "Politic",
      UserId: 1,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Testing",
      description: "Testing",
      tag: "Politic",
      UserId: 1,
      status: "Archived",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Testing",
      description: "Testing",
      tag: "Politic",
      UserId: 1,
      status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
