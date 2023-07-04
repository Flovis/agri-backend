const db = require("../models/index");

const displayLanguages = async (req, res) => {
    try {
        const languages = await db.Languages.findAll();
        if (languages) {
            return res.status(201).json({
                success: true,
                languages,
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Req imposssible"
        }); 
    }
};
module.exports = { displayLanguages };
