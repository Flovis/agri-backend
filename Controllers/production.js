const db = require("../models/index");

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

        if (!product) {
            product = await db.Products.create({ name: productName });
            productID = product.id;
            // return res.status(200).json({
            //     success: true,
            //     message: `creer a ${productID}`,
            // });
        } else {
            productID = product.id;
            // return res.status(200).json({
            //     success: true,
            //     message: `existe a ${productID}`,
            // });
        }
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
                return res.status(200).json({
                    success: true,
                    data: {
                        userId: userId,
                        planId: planAdded.id,
                        productName:productName,
                        dateDebut:semenceDate
                    }
                });
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

module.exports = { addProduct };
