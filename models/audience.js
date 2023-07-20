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
                foreignKey: "id_product",
            });
            Audience.belongsTo(models.Organisations, {
                foreignKey: "id_organisation",
            });
            Audience.belongsTo(models.Localisation, {
                foreignKey: "id_localisation",
            });
        }
    }
    Audience.init(
        {
            id_product: DataTypes.INTEGER,
            id_organisation: DataTypes.INTEGER,
            id_localisation: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Audience",
        }
    );
    return Audience;
};
