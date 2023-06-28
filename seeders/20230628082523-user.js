"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                  username: "herve",
                  password: DataTypes.STRING,
                  email: DataTypes.STRING,
                  first_name: DataTypes.STRING,
                  last_name: DataTypes.STRING,
                  date_of_birth: DataTypes.DATE,
                  gender: DataTypes.STRING,
                  phone_number: DataTypes.STRING,
                  adress: DataTypes.STRING,
                  state_province: DataTypes.STRING,
                  country: DataTypes.STRING,
                  city: DataTypes.STRING,
                  profile_picture: DataTypes.STRING,
                  account_status: DataTypes.STRING,
                  last_login_time: DataTypes.DATE
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("People", null, {});
    },
};
