"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Organisations",
            [
                {
                    name: "organisation1",
                    description: "bonne organisation",
                    address: "Lubumbashi",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "organisation2",
                    description: "bonne organisation",
                    address: "Kolwewi",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "organisation3",
                    description: "bonne organisation",
                    address: "Likasi",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Organisations", null, {});
    },
};
