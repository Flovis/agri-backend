"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Languages", [
            {
                name: "français",
                iso_code: "fr",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "anglais",
                iso_code: "en",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "lingala",
                iso_code: "en",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "swahili",
                iso_code: "sw",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "tshiluba",
                iso_code: "lu",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "kikongo",
                iso_code: "kg",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Languages", null, {});
    },
};
