"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Organisations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Organisations.hasMany(models.Roles);
            Organisations.hasMany(models.Farmes);
            Organisations.hasMany(models.Audience);
            Organisations.hasMany(models.User);


        }
    }
    Organisations.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            address: DataTypes.STRING,
            localisation: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Organisations",
        }
    );
    return Organisations;
};
