const db = require("../models/index");

const saveMeteoConfig = async (req, res) => {
    const {
        cycle,
        jour,
        canal,
        productName,
        condition,
        message,
        idContent,
        idUser,
        idOrganisation,
    } = req.body;
    let cycleId;
    let productId;
    let date;

    if (jour) {
        date = dayToDate(jour.toLowerCase());
    }

    if (cycle) {
        try {
            const cycle = await db.Cycles.findOne({
                where: { name: cycle.toLowerCase() },
                attributes: ["id"],
            });
            cycleId = cycle.id;
        } catch (error) {
            return res.status(400).json({
                message: "Error",
            });
        }
    }

    if (productName) {
        try {
            const product = await db.Products.findOne({
                where: { name: productName.toLowerCase() },
                attributes: {},
            });
            productId = product.id;
        } catch (error) {
            return res.status(400).json({
                error,
            });
        }
    }
    if (productId && cycleId) {
        if(date && canal && condition && message){
            try {
                const response = await db.ConfigMeteo.create({
                    UserId: idUser,
                    ContentId: idContent,
                    ProductId: productId,
                    CycleId: cycleId,
                    OrganisationId: idOrganisation,
                    date,
                    canal: canal,
                    condition,
                    message
                });
            } catch (error) {}
        }else{
            return res.status(200).json({
                message: "Tous les champs sont requis"
            })
        }
        
    }else{
        if(date && canal && condition && message){
            try {
                const response = await db.ConfigMeteo.create({
                    UserId: idUser,
                    ContentId: idContent,
                    OrganisationId: idOrganisation,
                    date,
                    canal: canal,
                    condition,
                    message
                });
            } catch (error) {}
        }else{
            return res.status(200).json({
                message: "Tous les champs sont requis"
            })
        }
          
    }
};

const dayToDate = (dayOfWeek) => {
    const days = [
        "dimanche",
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
    ];
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const targetDayOfWeek = days.indexOf(dayOfWeek.toLowerCase());

    if (targetDayOfWeek === -1) {
        return "Jour de la semaine invalide";
    }

    let daysToAdd = targetDayOfWeek - currentDayOfWeek;
    if (daysToAdd <= 0) {
        daysToAdd += 7;
    }

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysToAdd);

    // Formater la date au format 'YYYY-MM-DD'
    const formattedDate = targetDate.toISOString().split("T")[0];
    return formattedDate;
};

module.exports = { saveMeteoConfig };
