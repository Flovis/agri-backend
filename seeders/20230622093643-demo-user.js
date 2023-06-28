"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const password = await bcrypt.hash("12345", 10);
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    username: "herve",
                    password: password,
                    email: "herve@gmail.com",
                    first_name: "herve",
                    last_name: "Ngala",
                    gender: "M",
                    phone_number: "+243828858300",
                    country: "RDC",
                    city: "lubumbashi",
                    profile_picture: "",
                    account_status: "",
                    id_organisation:2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "Flo",
                    password: password,
                    email: "herve@gmail.com",
                    first_name: "herve",
                    last_name: "Ngala",
                    gender: "M",
                    phone_number: "+243824092951",
                    country: "RDC",
                    city: "lubumbashi",
                    profile_picture: "",
                    account_status: "",
                    id_organisation:2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "Atthie",
                    password: password,
                    email: "atthie@gmail.com",
                    first_name: "Atthie",
                    last_name: "Atthie",
                    gender: "M",
                    phone_number: "+243972389000",
                    country: "RDC",
                    city: "lubumbashi",
                    profile_picture: "",
                    account_status: "",
                    id_organisation:2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "abraham",
                    password: password,
                    email: "abraham@gmail.com",
                    first_name: "abraham",
                    last_name: "abraham",
                    gender: "M",
                    phone_number: "+243894838308",
                    country: "RDC",
                    city: "lubumbashi",
                    profile_picture: "",
                    account_status: "",
                    id_organisation:2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
