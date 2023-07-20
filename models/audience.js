"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Audience extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Audience.belongsTo(models.Products, {
                foreignKey: "ProductId",
            });
            Audience.belongsTo(models.Organisations, {
                foreignKey: "OrganisationId",
            });
            Audience.belongsTo(models.Localisation, {
                foreignKey: "LocalisationId",
            });
        }
    }
    Audience.init(
        {
            ProductId: DataTypes.INTEGER,
            OrganisationId: DataTypes.INTEGER,
            LocalisationId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Audience",
        }
    );
    return Audience;
};
