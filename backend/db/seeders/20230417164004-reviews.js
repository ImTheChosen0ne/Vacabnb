"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
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
        //   userId: 1,
        //   spotId: 1,
        //   review: 'This was the best stay I have had in a long time!',
        //   stars:  5
        // },
        // {
        //   userId: 1,
        //   spotId: 2,
        //   review: 'I would reccommend this stay to anyone. I have enjoyed my time.',
        //   stars:  4
        // },
        // {
        //   userId: 2,
        //   spotId: 3,
        //   review: 'There were some good and some bad. Not the best place but was good enough.',
        //   stars:  3
        // },
        // {
        //   userId: 2,
        //   spotId: 4,
        //   review: 'Enjoyed our stay and had lots of room for our family.',
        //   stars:  4
        // },
        // {
        //   userId: 3,
        //   spotId: 5,
        //   review: 'Could not have found a better place to stay. Was clean and tidy. No complaints!',
        //   stars: 5
        // }
        {
          userId: 1,
          spotId: 1,
          review:
            "I had an amazing stay at this beautiful beach house! The location was perfect and the house itself was clean, cozy, and had everything we needed. Highly recommend!",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review:
            "This was the perfect getaway spot for our family vacation. The house was spacious and comfortable, and the location couldn't have been better. We will definitely be coming back!",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 1,
          review:
            "We absolutely loved our stay at this beautiful beach house. The decor was charming and the location was unbeatable. We would definitely come back again!",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 2,
          review:
            "This tropical retreat was exactly what we needed for a relaxing vacation. The house was clean and spacious, and the private beach access was a huge plus. Highly recommend!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 2,
          review:
            "Our family had a wonderful stay at this tropical paradise. The house had everything we needed and the beach was just steps away. We would definitely recommend this spot to anyone looking for a relaxing vacation.",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 2,
          review:
            "This was the perfect spot for a relaxing and rejuvenating vacation. The house was clean and spacious, and the private beach access was a huge plus. We would definitely come back again!",
          stars: 3,
        },
        {
          userId: 1,
          spotId: 3,
          review:
            "Our family had an amazing time at this charming coastal cottage. The location was perfect and the house itself was cozy and comfortable. Highly recommend for a relaxing vacation!",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 3,
          review:
            "We loved our stay at this adorable coastal cottage. The house was well-maintained and had everything we needed for a comfortable stay. The nearby beach was also a huge plus. Highly recommend!",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 3,
          review:
            "This cozy coastal cottage was the perfect spot for our family vacation. The location was great and the house was clean and comfortable. We would definitely come back again!",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 4,
          review:
            "This luxury villa exceeded our expectations in every way. The house was stunning and had everything we needed for a comfortable and memorable vacation. Highly recommend!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review:
            "Our stay at this luxury villa was simply amazing. The location was perfect and the house itself was beautiful and well-appointed. We would definitely come back again!",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 4,
          review:
            "This was the perfect vacation spot for our family. The villa was spacious and luxurious, and the nearby beach was a huge plus. Highly recommend for a memorable and relaxing vacation!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 5,
          review:
            "We had a fantastic stay at this charming beach cottage. The house was cozy and comfortable, and the location was unbeatable. Highly recommend for a peaceful and relaxing vacation!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 4,
          review:
            "This beach cottage was exactly what we needed for a rejuvenating vacation. The house was well-maintained and had everything we needed. Highly recommend for a charming and memorable stay!",
          stars: 5,
        },
        {
          userId: 3,
          spotId: 5,
          review:
            "We loved our stay at this beautiful beach cottage. The location was perfect and the house itself was charming and comfortable. We would definitely come back again!",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 6,
          review:
            "This cabin was the perfect getaway for our family. The location was beautiful and peaceful, and the house was cozy and comfortable. Highly recommend for a relaxing vacation!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 6,
          review:
            "Our stay at this cabin was simply amazing. The house had everything we needed and the location was unbeatable. We would definitely come back again!",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 6,
          review:
            "This cabin was the perfect spot for our family vacation. The house was well-maintained and had all the amenities we needed. Highly recommend for a peaceful and memorable stay!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 7,
          review:
            "This beachfront condo was the perfect spot for our family vacation. The location was unbeatable and the house was clean and comfortable. Highly recommend for a memorable and relaxing stay!",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 7,
          review:
            "Our stay at this beachfront condo was simply amazing. The house had everything we needed and the views were stunning. We would definitely come back again!",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 7,
          review:
            "This condo was the perfect vacation spot for our family. The location was fantastic and the house itself was well-maintained and cozy. Highly recommend for a peaceful and rejuvenating stay!",
          stars: 4,
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        id: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
