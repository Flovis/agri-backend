const db = require("../models/index");

const addContents = async (req, res, next) => {
    const {
        title,
        language,
        cycle,
        productName,
        tag,
        category,
        description,
        link,
        contentText
    } = req.body;
    let categoryID;
    let languageID;
    let cycleID;
    let productID;
    let tagID;
    // console.log(req?.body);
    let file;
    if (category == "audio") {
        // console.log(req?.file);
        file = `${req.protocol}://${req?.get("host")}/${req?.file?.path}`;
        console.log("with Path", file);
    }

    if (
        title &&
        language &&
        cycle &&
        productName &&
        tag &&
        category &&
        description
    ) {
        if (file || link || contentText) {
            // Create or found category
            try {
                const categoryFind = await db.Content_Category.findOne({
                    where: { category_name: category.toLowerCase() },
                });
                if (!categoryFind) {
                    const createCategory = await db.Content_Category.create({
                        category_name: category.toLowerCase(),
                    });
                    categoryID = createCategory.id;
                    console.log("created", createCategory.id);
                } else {
                    categoryID = categoryFind.id;
                    console.log("find", categoryFind.id);
                }
            } catch (error) {
                // console.log(error);
                res.status(400).json({
                    error: "Impossible de créer ou d'ajouter une category",
                });
            }

            //Create or found language
            try {
                const languageFind = await db.Languages.findOne({
                    where: { name: language },
                });
                if (!languageFind) {
                    const createLanguage = await db.Languages.create({
                        name: language,
                    });
                    languageID = createLanguage.id;
                    console.log("created", createLanguage.id);
                } else {
                    languageID = languageFind.id;
                    console.log("find language", languageFind.id);
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    error: "Impossible de créer ou d'ajouter une language",
                });
            }

            //Create or found Plan
            try {
                const cycleFind = await db.Cycles.findOne({
                    where: { name: cycle.toLowerCase() },
                });
                if (!cycleFind) {
                    const createCycle = await db.Cycles.create({
                        name: cycle.toLowerCase(),
                    });
                    cycleID = createCycle.id;
                    console.log("created", createCycle.id);
                } else {
                    cycleID = cycleFind.id;
                    console.log("find cycle", cycleFind.id);
                }
            } catch (error) {
                // console.log(error);
                res.status(400).json({
                    error: "Impossible de créer ou d'ajouter un cycle",
                });
            }

            //Create or found Product
            try {
                let product = await db.Products.findOne({
                    where: { name: productName.toLowerCase() },
                });

                //Ajouter le produit dans la BD
                if (!product) {
                    product = await db.Products.create({
                        name: productName.toLowerCase(),
                    });
                    productID = product.id;
                    console.log("created", product.id);
                } else {
                    productID = product.id;
                    console.log("find product", product.id);
                }
            } catch (error) {
                console.log(error);
            }

            //create Tag
            try {
                let tagFind = await db.Tags.findOne({
                    where: { tag_name: tag.toLowerCase() },
                });

                //Ajouter le produit dans la BD
                if (!tagFind) {
                    tagFind = await db.Tags.create({
                        tag_name: tag.toLowerCase(),
                    });
                    tagID = tagFind.id;
                    console.log("created", tagFind.id);
                } else {
                    tagID = tagFind.id;
                    console.log("find tag", tagFind.id);
                }
            } catch (error) {
                console.log(error);
            }
            console.log(categoryID, languageID, cycleID, productID, tagID);
            if (categoryID && languageID && cycleID && productID && tagID) {
                try {
                    const createContent = await db.Contents.create({
                        titre: title,
                        file: file,
                        description: description,
                        contentText: contentText,
                        ContentCategoryId: categoryID,
                        CycleId: cycleID,
                        ProductId: productID,
                        LanguageId: languageID,
                        link
                    });

                    if (createContent) {
                        try {
                            const contentCategory =
                                await db.Content_Tags.create({
                                    TagId: tagID,
                                    ContentId: createContent.id,
                                });
                            console.log("content tag created");
                        } catch (error) {
                            console.log("tag content", error);
                        }
                    }
                    return res.status(201).json({
                        success: true,
                        message: "Un nouveau contenu a été ajouté!",
                    });
                } catch (error) {
                    console.log("impossible de creer ce contenu", error);
                }
            } else {
                console.log("Id manquant");
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Tous les champs sont requis",
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "Tous les champs sont requis",
        });
    }
};

const displayContents = async (req, res) => {
    const category = req.params?.category.toLowerCase();
    let categoryID;
    console.log(category);
    if (category) {
        try {
            const findCategory = await db.Content_Category.findOne({
                where: { category_name: category },
            });
            if (findCategory) {
                categoryID = findCategory.id;
                console.log(categoryID);
                try {
                    const allContent = await db.Contents.findAll({
                        where: { ContentCategoryId: categoryID },
                        include: [
                            { model: db.Content_Category },
                            { model: db.Cycles },
                            { model: db.Products },
                            { model: db.Languages },
                        ],
                    });
                    return res.status(200).json({
                        success: true,
                        allContent,
                    });
                } catch (error) {}
            } else {
                return res.status(200).json({
                    success: false,
                    message: "Aucun contenu associe a cette categorie ",
                });
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Impossible de recuperer la categorie",
            });
        }
    }
};

module.exports = { addContents, displayContents };
