"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Cycles",
            [
                {
                    name: "semence",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "croissance",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "recolte",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "conditionnement",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Cycles", null, {});
    },
};
