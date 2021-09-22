'use strict';

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
     await queryInterface.bulkInsert('Tracks', [
       {
         name: 'Jalur1',
         distance: 10,
         tracking_time: 15,
         location: 'Malang',
         transport: 'Naik bis dari stasiun a ke b',
         jumlahPos: 10,
         MountId: 1,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        name: 'Jalur2',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur3',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur1',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur2',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur3',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur1',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jalur2',
        distance: 10,
        tracking_time: 15,
        location: 'Malang',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Tracks', null)
  }
};
