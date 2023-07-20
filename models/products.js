"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.hasMany(models.Audience);
            Products.hasMany(models.PlanProduction);
            Products.hasMany(models.Contents);
        }
    }
    Products.init(
        {
            name: DataTypes.STRING,
            photo: DataTypes.STRING,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Products",
        }
    );
    return Products;
};
