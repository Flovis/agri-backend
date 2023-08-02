const db = require("../models/index");
const { getIo } = require("../socket");
const { sendWhatsappMsg } = require("./SendMessage");
const { newProductMessage } = require("./Messages");

const { userID, getID } = require("./authenticate");

const addProduct = async (req, res) => {
    const io = getIo();
    let productID;
    const {
        userId,
        userRole,
        productName,
        semenceDate,
        croissanceDate,
        recolteDate,
        conditionDate,
    } = req.body;
    try {
        let product = await db.Products.findOne({
            where: { name: productName },
        });

        //Ajouter le produit dans la BD
        if (!product) {
            product = await db.Products.create({ name: productName });
            productID = product.id;
        } else {
            productID = product.id;
        }

        //Ajout dans le plan de production
        if (productID) {
            const planAdded = await db.PlanProduction.create({
                dateDebut: semenceDate,
                semence: semenceDate,
                croissance: croissanceDate,
                recolte: recolteDate,
                condition: conditionDate,
                user_id: userId,
                product_id: productID,
                status: 1,
            });
            if (planAdded) {
                const data = await db.PlanProduction.findOne({
                    where: { id: planAdded.id },
                    include: [
                        {
                            model: db.User,
                            attributes: [
                                "email",
                                "username",
                                "phone_number",
                                "id_organisation",
                            ],
                        },
                    ],
                });
                if (data) {
                    // console.log(io);
                    // console.log(io.emit());
                    const message = newProductMessage(
                        data.User?.username,
                        productName,
                        semenceDate
                    );
                    sendWhatsappMsg(message, data.User?.phone_number);

                    if (io && io.emit) {
                        io.emit("NouveauPlan", {
                            idUser: data.User?.id,
                            username: data.User?.username,
                            phone: data.User?.phone,
                            id_organisation: data.User?.id_organisation,
                            productName: productName,
                            dateDebut: semenceDate,
                        });
                    } else {
                        console.log("impossible emit");
                    }

                    //send whatsapp

                    return res.status(200).json({
                        success: true,
                        message:
                            "Un nouveau produit a été ajouté a votre plan de production",

                        data: {
                            username: data.User?.username,
                            id_organisation: data.User?.id_organisation,
                            productName: productName,
                            dateDebut: semenceDate,
                        },
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Requete impossible",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Erreur d'ajout du produit",
                });
            }
        }
    } catch (error) {
        res.status(400).json("Erreur");
    }
};

const displayProducts = async (req, res) => {
    // console.log(userID);
    // console.log(getID);
    const io = getIo();
    // console.log("flowbac", io);
    console.log(req.params);
    const id = parseInt(req.params.id, 10);
    try {
        const productionPlan = await db.PlanProduction.findAll({
            where: { user_id: id, status: 1 },
            include: { model: db.Products },
            order: [["id", "ASC"]],
        });
        // console.log(productionPlan.length);
        if (productionPlan) {
            if (productionPlan.length > 0) {
                return res.status(200).json({
                    success: true,
                    productionPlan,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "Aucun produit au plan de production",
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Requete impossible",
        });
    }
};
const displayAllProductPlan = async (req, res) => {
    try {
        const data = await db.PlanProduction.findAll({
            attributes: ["id"],
            include: { model: db.Products, attributes: ["id", "name"] },
        });
        if (data) {
            res.status(200).json({
                data
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: "Impossible de recuperer les donnnees"
        })
    }
};

module.exports = { addProduct, displayProducts, displayAllProductPlan};
