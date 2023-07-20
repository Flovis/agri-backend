"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Localisations",
            [
                {
                    name: "Kipushi",
                    latitude: "-11.7708",
                    longitude: "27.2577",
                    UserId: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    
                },
                {
                    name: "Kambove",
                    latitude: "-10.8726",
                    longitude: "26.5945",
                    UserId: 5,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Tanganyika",
                    latitude: "-8.7495",
                    longitude: "28.6091",
                    UserId: 6,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "Kamina",
                    latitude: "-8.7389",
                    longitude: "25.0033",
                    UserId: 8,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Localisations", null, {});
    },
};
