'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages';

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
        reviewId: 1,
        url: 'https://reviewimage1.com/photos'
      },
      {
        reviewId: 2,
        url: 'https://reviewimage2.com/photos'
      },
      {
        reviewId: 3,
        url: 'https://reviewimage3.com/photos'
      },
      {
        reviewId: 4,
        url: 'https://reviewimage4.com/photos'
      },
      {
        reviewId: 5,
        url: 'https://reviewimage5.com/photos'
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
