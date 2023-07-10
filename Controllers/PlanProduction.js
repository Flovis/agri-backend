const db = require("../models/index");
const { getIo } = require("../socket");
const { sendMessage } = require("./SendMessage");

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
                    sendMessage(
                        ["+243824092951"],
                        `Bounjour ${data.User?.username}, vous avez ajouté le produit ${productName} au plan de production. Vous recevrez constament des conseilles pratiques.`
                    );
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
    const io = getIo();
    // console.log("flowbac", io);
    const id = parseInt(req.params.id, 10);

    io.emit("Test", "aime");
    io.on("Ok", (msg) => {
        console.log(msg);
    });
    try {
        const productionPlan = await db.PlanProduction.findAll({
            where: { user_id: id },
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

module.exports = { addProduct, displayProducts };
