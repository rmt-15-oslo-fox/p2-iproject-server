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
         name: 'Ranu Pani',
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
        name: 'Landengan Dowo',
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
        name: 'Watu Rejeng',
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
        name: 'Sembalun',
        distance: 10,
        tracking_time: 15,
        location: 'Lombok',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Timbanuh',
        distance: 10,
        tracking_time: 15,
        location: 'Lombok',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Senaru',
        distance: 10,
        tracking_time: 15,
        location: 'Lombok',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kersik Tuo',
        distance: 10,
        tracking_time: 15,
        location: 'Jambi',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Solok Selatan',
        distance: 10,
        tracking_time: 15,
        location: 'Solok',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cibodas',
        distance: 8,
        tracking_time: 7,
        location: 'Bogor',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gunung Putri',
        distance: 8,
        tracking_time: 7,
        location: 'Bogor',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salabintana',
        distance: 8,
        tracking_time: 7,
        location: 'Bogor',
        transport: 'Naik bis dari stasiun a ke b',
        jumlahPos: 10,
        MountId: 4,
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
