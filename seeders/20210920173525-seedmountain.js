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
     await queryInterface.bulkInsert('Mountains', [
       {
         name: 'Semeru',
         height: '3676',
         status: true,
         lokasi: 'Kabupaten Malang dan Kabupaten Lumajang, Jawa Timur, Indonesia',
         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Semeru.jpg',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        name: 'Rinjani',
        height: '3726',
        status: true,
        lokasi: 'Lombok, Indonesia',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Segara_Anak_Lake_Mt_Barujari.JPG/300px-Segara_Anak_Lake_Mt_Barujari.JPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
       name: 'Kerinci',
       height: '3805',
       status: true,
       lokasi: 'Sumatera Barat, Indonesia',
       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Gede',
      height: '2958',
      status: true,
      lokasi: 'Bogor, Jawa Barat',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mount_Gede_00.jpg/1920px-Mount_Gede_00.jpg',
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
     await queryInterface.bulkDelete('Mountains', null)
  }
};
