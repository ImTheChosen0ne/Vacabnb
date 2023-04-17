'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-26',
        endDate: '2023-02-04'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-03-15',
        endDate: '2023-03-20'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-02-16',
        endDate: '2023-02-24'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-03-30',
        endDate: '2023-04-08'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2023-01-10',
        endDate: '2023-01-20'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
