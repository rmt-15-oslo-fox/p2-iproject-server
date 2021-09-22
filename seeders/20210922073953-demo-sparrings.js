'use strict';

const fs = require("fs")

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
    const data = JSON.parse(fs.readFileSync("./data/sparrings.json", "utf-8"))
    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    });

    await queryInterface.bulkInsert("Sparrings", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Sparrings", null, {})
  }
};
