const db = require("../models/index");
const {io} = require("../App")


const addProduct = async (req, res) => {
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
                    if (io && io.emit) {
                        io.emit("NouveauPlan", {
                            username: data.User?.username,
                            id_organisation: data.User?.id_organisation,
                            productName: productName,
                            dateDebut: semenceDate,
                        });
                    }
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
    const id = parseInt(req.params.id, 10);
    console.log(id);
    try {
        const productionPlan = await db.PlanProduction.findAll({
            where: { user_id: id },
            include: { model: db.Products },
            order: [["id", "ASC"]],
        });
        console.log(productionPlan.length);
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

module.exports = { addProduct, displayProducts };
