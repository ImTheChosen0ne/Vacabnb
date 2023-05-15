'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
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
        url: 'https://i.imgur.com/KG70WvN.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/c4OjQxA.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/CjBJRfK.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/CjBJRfK.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.imgur.com/NHhe0tO.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/qX0AH8z.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/opBqQSG.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/w9Zn5bu.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/MulbXCU.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.imgur.com/IcY42ZW.jpeg',
        preview: true
      },      {
        spotId: 3,
        url: 'https://i.imgur.com/2Ilm2cO.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2015/10/20/18/57/furniture-998265_1280.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg',
        preview: true
      },      {
        spotId: 4,
        url: 'https://i.imgur.com/2v3CyNz.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2017/08/02/01/01/living-room-2569325_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_1280.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/09/19/17/20/home-1680800_1280.jpg',
        preview: true
      },      {
        spotId: 5,
        url: 'https://i.imgur.com/ptoqbvo.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2014/07/10/17/17/bedroom-389254_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2014/08/11/21/40/bedroom-416062_1280.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2016/11/18/13/03/apple-1834328_1280.jpg',
        preview: true
      },      {
        spotId: 6,
        url: 'https://i.imgur.com/xcG5Kqg.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2017/08/08/00/27/home-2609600_1280.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2017/12/31/09/21/furniture-3051843_1280.jpg',
        preview: true
      },      {
        spotId: 7,
        url: 'https://i.imgur.com/TyCoaV0.jpeg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2020/08/25/18/28/workplace-5517744_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2016/06/03/14/31/dinner-1433494_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2020/11/09/17/07/chair-5727263_1280.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg',
        preview: true
      },      {
        spotId: 8,
        url: 'https://i.imgur.com/FsfVFbN.jpeg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2022/04/14/13/36/bedroom-7132435_1280.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2020/08/25/18/28/flower-vase-5517745_1280.jpg',
        preview: true
      },      {
        spotId: 9,
        url: 'https://i.imgur.com/KlNztpF.jpeg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2017/10/01/00/52/home-office-2804083_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2017/08/17/11/46/indoor-2650994_1280.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2017/12/27/14/41/window-3042834_1280.jpg',
        preview: true
      },
       {
        spotId: 10,
        url: 'https://i.imgur.com/qa9zk64.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2018/10/28/12/37/bedroom-3778695_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685517_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2017/12/27/14/42/furniture-3042835_1280.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2016/06/05/22/13/home-1438305_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://i.imgur.com/TBLy2MJ.jpeg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/06/15/08/54/household-2404521_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685522_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2017/02/07/18/16/living-room-2046668_1280.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cdn.pixabay.com/photo/2019/09/11/04/43/interior-design-4467768_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://i.imgur.com/Z4YPq9P.jpeg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2015/03/07/16/34/home-663226_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2016/06/24/11/47/architecture-1477100_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2016/07/14/02/22/living-room-1515976_1280.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://cdn.pixabay.com/photo/2015/02/02/23/39/hall-621741_1280.jpg',
        preview: true
      }, {
        spotId: 13,
        url: 'https://i.imgur.com/2oUvRXG.jpeg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685516_1280.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://cdn.pixabay.com/photo/2018/08/09/03/58/home-3593729_1280.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://cdn.pixabay.com/photo/2017/10/04/14/50/staging-2816464_1280.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://cdn.pixabay.com/photo/2017/08/17/11/47/indoor-2650995_1280.jpg',
        preview: true
      }, {
        spotId: 14,
        url: 'https://i.imgur.com/YfY7oJl.jpeg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://cdn.pixabay.com/photo/2016/12/30/07/55/bedroom-1940169_1280.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://cdn.pixabay.com/photo/2015/10/26/00/00/dining-room-1006525_1280.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://cdn.pixabay.com/photo/2015/12/05/23/20/bedroom-1078887_1280.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://cdn.pixabay.com/photo/2015/03/07/16/45/home-663234_1280.jpg',
        preview: true
      }, {
        spotId: 15,
        url: 'https://i.imgur.com/7InPjml.jpeg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://cdn.pixabay.com/photo/2018/02/13/09/39/modern-minimalist-bathroom-3150293_1280.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://cdn.pixabay.com/photo/2017/06/13/22/43/interior-2400372_1280.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://cdn.pixabay.com/photo/2016/11/09/02/21/kitchen-1809844_1280.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://cdn.pixabay.com/photo/2016/08/07/00/27/home-office-1575464_1280.jpg',
        preview: true
      }, {
        spotId: 16,
        url: 'https://i.imgur.com/QELltBa.jpeg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://cdn.pixabay.com/photo/2018/05/25/17/52/home-3429674_1280.jpg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://cdn.pixabay.com/photo/2015/03/07/16/33/home-663224_1280.jpg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://cdn.pixabay.com/photo/2014/07/10/17/17/living-room-389264_1280.jpg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://cdn.pixabay.com/photo/2019/04/23/09/04/indoor-4148898_1280.jpg',
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
