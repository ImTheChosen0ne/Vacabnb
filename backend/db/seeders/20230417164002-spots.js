'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots';

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
        ownerId: 1,
        address: '123 pelican dr',
        city: 'East lyme',
        state: 'Connecticut',
        country: 'United States Of America',
        lat: 72.22,
        lng: 41.35,
        name: 'PRIVATE BEACH: BEACHFRONTS & BALCONIES',
        description: 'This Spectacular Waterfront Beach House gives you the true New England experience, with Niantic Bay in the backyard',
        price: 517
      },
      {
        ownerId: 1,
        address: '17 sandwich ln',
        city: 'Sandwich',
        state: 'Massachusetts',
        country: 'United States Of America',
        lat: 70.49,
        lng: 41.75,
        name: 'OCEANFRONT Home with Deck ',
        description: 'Book a stay in our gorgeous 2 Bedroom House + Bonus Room for 7 in Sandwich, MA! ',
        price: 1068
      },
      {
        ownerId: 2,
        address: '24 malibu way',
        city: 'Malibu',
        state: 'California',
        country: 'United States Of America',
        lat: 118.77,
        lng: 34.02,
        name: 'Malibu Mid-Century Modern Luxury retreat home',
        description: 'Relax in a luxurious 3-story Malibu getaway with spectacular ocean & mountain views. ',
        price: 1575
      },
      {
        ownerId: 3,
        address: '18 fox dr',
        city: 'Fort Lauderdale',
        state: 'Florida',
        country: 'United States Of America',
        lat: 80.13,
        lng: 26.12,
        name: 'LUX House /Heated Spa- Downtown & Beach',
        description: 'Fox Island is a beautiful modern fully fenced  and newly renovated one-floor home in the heart of Fort Lauderdale',
        price: 420
      },
      {
        ownerId: 3,
        address: '6 luxury dr',
        city: 'Pompano Beach',
        state: 'Florida',
        country: 'United States Of America',
        lat: 80.12,
        lng: 26.23,
        name: 'RENT LUXE 5 STAR 5 BED HTD POOL+HOT TUB STUNNING!',
        description: 'Welcome To Your 5 Star Luxury Retreat... Welcome to Casa Mille!',
        price: 449
      },
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
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
