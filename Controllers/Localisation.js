const db = require("../models/index");
const ROLES = require("./roles");

const displayLocalisation = async (req, res) => {
    const id_organisation = req.params.id_localisation;
    // console.log(req.params);
    console.log(ROLES);

    try {
        let data;
        if (id_organisation) {
            data = await db.User.findAll({
                attributes: ["id", "username", "phone_number"],
                where: { id_organisation },
                include: [
                    {
                        model: db.Localisation,
                    },
                    {
                        model: db.User_Roles,
                        attributes: ["RoleId"],
                        where: { RoleId: ROLES.Famer },
                    },
                ],
            });
        } else {
            data = await db.User.findAll({
                attributes: ["id", "username", "phone_number"],
                include: [
                    {
                        model: db.Localisation,
                    },
                    {
                        model: db.User_Roles,
                        attributes: ["RoleId"],
                        where: { RoleId: ROLES.Famer },
                    },
                ],
            });
        }

        if (data) {
            // console.log(data);
            return res.status(200).json({
                data,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message:
                "Une erreur s'est produite lors de la récupération des données",
        });
    }
};

module.exports = { displayLocalisation };
