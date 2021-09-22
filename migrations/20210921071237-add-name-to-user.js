"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "name", {
      type: Sequelize.STRING,
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "name", {});
  },
};
