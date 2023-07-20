"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "User_Roles",
            [
                {
                    UserId: 2,
                    RoleId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 3,
                    RoleId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 4,
                    RoleId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 5,
                    RoleId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 6,
                    RoleId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    UserId: 8,
                    RoleId: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User_Roles", null, {});
    },
};
