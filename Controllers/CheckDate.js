const db = require("../models/index");
const moment = require("moment");
const { getIo } = require("../socket");
const { sendWhatsappMsg } = require("./SendMessage");
const { onProductionDate, OnProductionDateIo } = require("./Messages");
const { Op } = require("sequelize");
const ROLES = require("./roles");

const cycle = {
    semence: 1,
    croissance: 2,
    recolte: 3,
    conditionnement: 4,
};

let prodFieldName;

const checkDate = async () => {
    const io = getIo();
    const today = moment().startOf("day");
    console.log(today);

    try {
        const response = await db.PlanProduction.findAll({
            include: [
                {
                    model: db.User,
                    attributes: [
                        "id",
                        "username",
                        "phone_number",
                        "id_organisation",
                    ],
                },
                {
                    model: db.Products,
                    attributes: ["name"],
                },
            ],
        });

        if (response.length > 0) {
            response.forEach(async (record) => {
                // ... Accéder à d'autres propriétés comme nécessaire
                const id = record.id;
                const user_id = record.user_id;
                const status = record.status;
                const product_id = record.product_id;
                const semence = moment(record.semence).startOf("day");
                const croissance = moment(record.croissance).startOf("day");
                const recolte = moment(record.recolte).startOf("day");
                const condition = moment(record.condition).startOf("day");
                const user = record.User;
                const product = record.Product;

                if (today.isSame(semence)) {
                    //faire un select de la table config ou id de cycle et
                    //produit corresponde pour envoyer le contenu
                    console.log("semence is same");

                    const message = onProductionDate(
                        user.username,
                        "semence",
                        product.name
                    );
                    if (io && io.emit) {
                        OnProductionDateIo(
                            user.username,
                            "semence",
                            product.name,
                            io
                        );
                    }

                    await sendWhatsappMsg(message, user.phone_number);
                }
                if (today.isSame(croissance)) {
                    //faire un select de la table config ou id de cycle et
                    //produit corresponde pour envoyer le contenu

                    const message = onProductionDate(
                        user.username,
                        "croissance",
                        product.name
                    );
                    await sendWhatsappMsg(message, user.phone_number);

                    if (io && io.emit) {
                        OnProductionDateIo(
                            user.username,
                            "croissance",
                            product.name,
                            io
                        );
                    }
                }
                if (today.isSame(recolte)) {
                    const message = onProductionDate(
                        user.username,
                        "recolte",
                        product.name
                    );
                    await sendWhatsappMsg(message, user.phone_number);

                    if (io && io.emit) {
                        OnProductionDateIo(
                            user.username,
                            "recolte",
                            product.name,
                            io
                        );
                    }
                }
                if (today.isSame(condition)) {
                    const message = onProductionDate(
                        user.username,
                        "conditionnement",
                        product.name
                    );
                    await sendWhatsappMsg(message, user.phone_number);

                    if (io && io.emit) {
                        OnProductionDateIo(
                            user.username,
                            "conditionnement",
                            product.name,
                            io
                        );
                    }
                }
            });
        }
    } catch (error) {
        console.log("Get all data error", error);
    }
};

const checkDateConfigMeteo = async (req, res) => {
    const today = new Date()
    try {
        const currentDate = new Date();
        const response = await db.ConfigMeteo.findAll({
            where: { sendDate: currentDate },
            // attributes: ["id", "sendDate", "conditionDate", "conditionDay", "CycleId"],
        });
        console.log(response[0].id);

        if (response) {
            
            
            for (let i = 0; i < response.length; i++) {
                if (response[i].CycleId === cycle.semence) {
                    prodFieldName = "semence";
                    console.log(prodFieldName)
                } else if (response[i].CycleId === cycle.croissance) {
                    prodFieldName = "croissance";
                } else if (response[i].CycleId === cycle.recolte) {
                    prodFieldName = "recolte";
                } else if (response[i].CycleId === cycle.conditionnement) {
                    prodFieldName = "condition";
                } else {
                    console.error("Id cycle impossible");
                    return res.status(500).json({
                        error: "Id cycle impossible",
                    });
                }
                try {
                    const users = await db.User.findAll({
                        where: {
                            id_organisation: 2,
                            // [Op.or]: [{ id_organisation: null }],
                        },
                        attributes: ["id", "username", "phone_number"],
                        include: [
                            {
                                model: db.User_Roles,
                                where: { RoleId: ROLES.Famer },
                            },
                            {
                                model: db.PlanProduction,
                                // where: { recolte: { [Op.lte]: today } },
                                where:{product_id: 9}
                            },
                        ],
                    });
                    if (users) {
                        return res.status(200).json({
                            users,
                            response,
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({
                        error: "Error",
                    });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: "impossible",
        });
    }
};

module.exports = { checkDate, checkDateConfigMeteo };
