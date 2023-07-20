const db = require("../models/index");
const moment = require("moment");
const { getIo } = require("../socket");
const { sendWhatsappMsg } = require("./SendMessage");
const { onProductionDate, OnProductionDateIo } = require("./Messages");

const cycle = {
    semence: 1,
    croissance: 2,
    recolte: 3,
    conditionnement: 4,
};

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

module.exports = { checkDate };
