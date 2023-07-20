"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Roles",
            [
                {
                    name: "superAdmin",
                    slug: "SA",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "admin",
                    slug: "ADM",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: "famer",
                    slug: "USR",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Roles", null, {});
    },
};
