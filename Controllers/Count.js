const db = require("../models/index");
const roles = require("./roles");
const { Op } = require("sequelize");

const getStatistics = async (req, res) => {
    try {
        const today = new Date();
        const nbFamers = await db.User_Roles.count({
            where: { RoleId: roles.Famer },
        });
        const nbProducts = await db.PlanProduction.count({
            where: { status: 1 },
        });
        const nbRecoltes = await db.PlanProduction.count({
            where: {
                recolte: {
                    [Op.lt]: today,
                },
            },
        });

        return res.status(200).json({
            agriculteurs: nbProducts,
            cultures: nbProducts,
            recoltes: nbRecoltes,
        });

        console.log(nbFamers, nbProducts, nbRecoltes);
    } catch (error) {
        res.status(500).json({
            error: "Impossible de recuperer les statistics",
        });
    }
};

module.exports = { getStatistics };
