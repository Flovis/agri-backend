const db = require("../models/index");

const saveProductionConfig = async (req, res) => {
    const { groupe, cycle, jour, canal, condition, message, idContent } = req.body;
    let cycleID;

    try {
        const data = await db.Cycles.findOne({
            where: { name: cycle.toLowerCase() },
            attributes: ["id"],
        });

        cycleID = data.id;

        const date = dayToDate(jour.toLowerCase());
        console.log(cycleID)
        console.log(date);
        try {
            const response = await db.ConfigMeteo
        } catch (error) {
            
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error",
        });
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

module.exports = { saveProductionConfig };
