'use strict';
const fs = require("fs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./assets/listClub.json", "utf8"))
        data.forEach(item => {
            item.createdAt = new Date()
            item.updatedAt = new Date()
        });

        return queryInterface.bulkInsert('Clubs', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clubs', null, {});
  }
};
