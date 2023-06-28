"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "User_Roles",
            [
                {
                    user_id: 3,
                    role_id: 3,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    user_id: 4,
                    role_id: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    user_id: 5,
                    role_id: 4,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    user_id: 6,
                    role_id: 4,
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
