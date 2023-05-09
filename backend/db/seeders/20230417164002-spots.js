"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      options,
      [
        // {
        //   ownerId: 1,
        //   address: '123 pelican dr',
        //   city: 'East lyme',
        //   state: 'Connecticut',
        //   country: 'United States Of America',
        //   lat: 72.22,
        //   lng: 41.35,
        //   name: 'PRIVATE BEACH: BEACHFRONTS & BALCONIES',
        //   description: 'This Spectacular Waterfront Beach House gives you the true New England experience, with Niantic Bay in the backyard',
        //   price: 517
        // },
        // {
        //   ownerId: 1,
        //   address: '17 sandwich ln',
        //   city: 'Sandwich',
        //   state: 'Massachusetts',
        //   country: 'United States Of America',
        //   lat: 70.49,
        //   lng: 41.75,
        //   name: 'OCEANFRONT Home with Deck ',
        //   description: 'Book a stay in our gorgeous 2 Bedroom House + Bonus Room for 7 in Sandwich, MA! ',
        //   price: 1068
        // },
        // {
        //   ownerId: 2,
        //   address: '24 malibu way',
        //   city: 'Malibu',
        //   state: 'California',
        //   country: 'United States Of America',
        //   lat: 118.77,
        //   lng: 34.02,
        //   name: 'Malibu Mid-Century Modern Luxury retreat home',
        //   description: 'Relax in a luxurious 3-story Malibu getaway with spectacular ocean & mountain views. ',
        //   price: 1575
        // },
        // {
        //   ownerId: 3,
        //   address: '18 fox dr',
        //   city: 'Fort Lauderdale',
        //   state: 'Florida',
        //   country: 'United States Of America',
        //   lat: 80.13,
        //   lng: 26.12,
        //   name: 'LUX House /Heated Spa- Downtown & Beach',
        //   description: 'Fox Island is a beautiful modern fully fenced  and newly renovated one-floor home in the heart of Fort Lauderdale',
        //   price: 420
        // },
        // {
        //   ownerId: 3,
        //   address: '6 luxury dr',
        //   city: 'Pompano Beach',
        //   state: 'Florida',
        //   country: 'United States Of America',
        //   lat: 80.12,
        //   lng: 26.23,
        //   name: 'RENT LUXE 5 STAR 5 BED HTD POOL+HOT TUB STUNNING!',
        //   description: 'Welcome To Your 5 Star Luxury Retreat... Welcome to Casa Mille!',
        //   price: 449
        // },
        {
          ownerId: 1,
          address: "1 Surfside Rd",
          city: "Nantucket",
          state: "Massachusetts",
          country: "United States Of America",
          lat: 41.284,
          lng: -70.099,
          name: "Luxury Beachfront Villa",
          description:
            "Experience Nantucket like never before in this stunning beachfront villa complete with private beach access and panoramic ocean views.",
          price: 1200,
        },
        {
          ownerId: 1,
          address: "520 Cowpet Bay East",
          city: "Saint Thomas",
          state: "US Virgin Islands",
          country: "United States Of America",
          lat: 18.317,
          lng: -64.865,
          name: "Stunning Ocean View Condo",
          description:
            "Escape to the paradise of the US Virgin Islands in this luxurious ocean view condo, complete with a private balcony and easy access to the beach.",
          price: 800,
        },
        {
          ownerId: 1,
          address: "1 Hotel Rd",
          city: "Newport",
          state: "Rhode Island",
          country: "United States Of America",
          lat: 41.49,
          lng: -71.32,
          name: "Historic Mansion on the Water",
          description:
            "Experience the charm and elegance of Newport in this stunning historic mansion overlooking the water, with easy access to the beach and all the city has to offer.",
          price: 1500,
        },
        {
          ownerId: 1,
          address: "233 Old Wharf Rd",
          city: "Dennis Port",
          state: "Massachusetts",
          country: "United States Of America",
          lat: 41.657,
          lng: -70.124,
          name: "Charming Beach Cottage",
          description:
            "Step back in time and experience Cape Cod living in this cozy and charming beach cottage, just steps away from the sand and surf.",
          price: 400,
        },
        {
          ownerId: 1,
          address: "1525 Ocean Ave",
          city: "Santa Monica",
          state: "California",
          country: "United States Of America",
          lat: 34.011,
          lng: -118.498,
          name: "Luxury Ocean View Apartment",
          description:
            "Live like a movie star in this luxurious ocean view apartment in the heart of Santa Monica, just steps away from the beach and all the action.",
          price: 2000,
        },
        {
          ownerId: 2,
          address: "3259 Gulf Dr",
          city: "Holmes Beach",
          state: "Florida",
          country: "United States Of America",
          lat: 27.5,
          lng: -82.707,
          name: "Spectacular Gulf View House",
          description:
            "Escape to paradise in this stunning Gulf view house, with private beach access and all the amenities you could want for a relaxing and memorable vacation.",
          price: 2500,
        },
        {
          ownerId: 2,
          address: "1278 Old Montauk Hwy",
          city: "Montauk",
          state: "New York",
          country: "United States Of America",
          lat: 41.04,
          lng: -71.935,
          name: "Stylish Oceanfront Home",
          description:
            "Enjoy the beauty of Montauk in this stylish and modern oceanfront home, with stunning views and easy access to the beach and all the town has to offer.",
          price: 1800,
        },
        {
          ownerId: 2,
          address: "121 Atlantic Ave",
          city: "Westerly",
          state: "Rhode Island",
          country: "United States Of America",
          lat: 41.313,
          lng: -71.825,
          name: "Private Beach House",
          description:
            "Relax and unwind in this peaceful and secluded private beach house, complete with all the amenities you need for the ultimate beach vacation.",
          price: 900,
        },
        {
          ownerId: 2,
          address: "11 E Beach Lagoon Dr",
          city: "Hilton Head Island",
          state: "South Carolina",
          country: "United States Of America",
          lat: 32.154,
          lng: -80.746,
          name: "Luxury Oceanfront Villa",
          description:
            "Experience the beauty and luxury of Hilton Head Island in this stunning oceanfront villa, with private beach access and breathtaking views of the Atlantic.",
          price: 2800,
        },
        {
          ownerId: 2,
          address: "140 N Ocean Blvd",
          city: "Pompano Beach",
          state: "Florida",
          country: "United States Of America",
          lat: 26.237,
          lng: -80.09,
          name: "Modern Beachfront Condo",
          description:
            "Enjoy the best of Pompano Beach in this modern and stylish beachfront condo, with all the amenities you need for a comfortable and memorable vacation.",
          price: 1500,
        },
        {
          ownerId: 2,
          address: "1041 Dune Rd",
          city: "Westhampton Beach",
          state: "New York",
          country: "United States Of America",
          lat: 40.821,
          lng: -72.72,
          name: "Spectacular Oceanfront Home",
          description:
            "Live like a celebrity in this spectacular oceanfront home in the Hamptons, with private beach access and all the luxury amenities you could want.",
          price: 5000,
        },
        {
          ownerId: 3,
          address: "1001 E Gulf Dr",
          city: "Sanibel",
          state: "Florida",
          country: "United States Of America",
          lat: 26.438,
          lng: -82.076,
          name: "Secluded Beach House",
          description:
            "Get away from it all in this secluded beach house on Sanibel Island, with private beach access and all the peace and tranquility you could want.",
          price: 1200,
        },
        {
          ownerId: 3,
          address: "120 Ocean Blvd",
          city: "Isle of Palms",
          state: "South Carolina",
          country: "United States Of America",
          lat: 32.785,
          lng: -79.785,
          name: "Spacious Beachfront Home",
          description:
            "Gather your family and friends in this spacious beachfront home on Isle of Palms, with plenty of room for everyone to relax and enjoy the sun, sand, and surf.",
          price: 3000,
        },
        {
          ownerId: 3,
          address: "1659 Beach Rd",
          city: "Englewood",
          state: "Florida",
          country: "United States Of America",
          lat: 26.937,
          lng: -82.349,
          name: "Peaceful Beach Retreat",
          description:
            "Escape to this peaceful beach retreat on Manasota Key, with private beach access and all the amenities you need for a relaxing and rejuvenating vacation.",
          price: 800,
        },
        {
          ownerId: 3,
          address: "307 Shore Rd",
          city: "Cape Elizabeth",
          state: "Maine",
          country: "United States Of America",
          lat: 43.551,
          lng: -70.194,
          name: "Charming Coastal Cottage",
          description:
            "Experience the charm and beauty of coastal Maine in this charming cottage, just steps from the beach and with all the amenities you need for a comfortable and memorable vacation.",
          price: 600,
        },
        {
          ownerId: 3,
          address: "2743 NE Ocean Blvd",
          city: "Stuart",
          state: "Florida",
          country: "United States Of America",
          lat: 27.238,
          lng: -80.185,
          name: "Tropical Beachfront Retreat",
          description:
            "Escape to this tropical beachfront retreat on Hutchinson Island, with private beach access and all the amenities you need for a relaxing and rejuvenating vacation.",
          price: 1100,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
