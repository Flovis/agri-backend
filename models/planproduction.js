"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PlanProduction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            PlanProduction.belongsTo(models.User, {
                foreignKey: "user_id",
            });
            PlanProduction.belongsTo(models.Products, {
                foreignKey: "product_id",
            });
        }
    }
    PlanProduction.init(
        {
            dateDebut: DataTypes.DATEONLY,
            semence: DataTypes.DATEONLY,
            croissance: DataTypes.DATEONLY,
            recolte: DataTypes.DATEONLY,
            condition: DataTypes.DATEONLY,
            status:DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "PlanProduction",
        }
    );
    return PlanProduction;
};
