"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Localisation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Localisation.hasMany(models.Audience);
            Localisation.belongsTo(models.User,{
                foreignKey:"user_id"
              })
        }
    }
    Localisation.init(
        {
            name: DataTypes.STRING,
            latitute: DataTypes.STRING,
            longitude: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Localisation",
        }
    );
    return Localisation;
};
