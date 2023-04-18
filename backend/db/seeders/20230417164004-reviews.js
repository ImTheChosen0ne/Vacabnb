'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
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
        review: 'This was the best stay I have had in a long time!',
        stars:  5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'I would reccommend this stay to anyone. I have enjoyed my time.',
        stars:  4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'There were some good and some bad. Not the best place but was good enough.',
        stars:  3
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Enjoyed our stay and had lots of room for our family.',
        stars:  4
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Could not have found a better place to stay. Was clean and tidy. No complaints!',
        stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
