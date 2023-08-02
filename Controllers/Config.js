const db = require("../models/index");

const saveMeteoConfig = async (req, res) => {
    const {
        cycle,
        sendDay,
        canal,
        // productName,
        selectedCondition,
        message,
        // idContent,
        idUser,
        idOrganisation,
        selectedDay
        
    } = req.body;

    let cycleId;
    let productId;
    let sendDate;
    let conditionDate;


    if (sendDay) {
        sendDate = dayToDate(sendDay.toLowerCase());
        // console.log(date);
    }
    if (selectedDay) {
        conditionDate = dayToDate(selectedDay.toLowerCase());
        // console.log(date);
    }

    if (cycle) {
        try {
            const response = await db.Cycles.findOne({
                where: { name: cycle.toLowerCase() },
                attributes: ["id"],
            });
            cycleId = response.id;
            // console.log("id cycle", cycleId);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Error",
            });
        }
    }

    // if (productName) {
    //     try {
    //         const product = await db.Products.findOne({
    //             where: { name: productName.toLowerCase() },
    //             attributes: {},
    //         });
    //         productId = product.id;

    //         console.log(productId)

    //     } catch (error) {
    //         return res.status(400).json({
    //             error,
    //         });
    //     }
    // }
    if (cycleId) {
        if (sendDate && conditionDate && canal && selectedCondition && message && selectedDay) {
            try {
                const response = await db.ConfigMeteo.create({
                    UserId: idUser,
                    // ContentId: idContent,
                    ProductId: productId,
                    CycleId: cycleId,
                    OrganisationId: idOrganisation,
                    sendDate,
                    conditionDate,
                    conditionDay: selectedDay,
                    canal,
                    condition: selectedCondition,
                    message,
                });
                return res.status(200).json({
                    success: true,
                    message: "Confirguration enregistées",
                });
            } catch (error) {}
        } else {
            return res.status(500).json({
                message: "Tous les champs sont requis",
            });
        }
    } else {
        return res.status(500).json({
            message: "Tous les champs sont requis",
        });
    }
};

const displayMeteoConfig = async (req, res) => {
    const id = req.params.id_user;

    try {
        const data = await db.ConfigMeteo.findAll({ UserId: id });
        if (data) {
            return res.status(200).json({
                data,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Impossible re recuperer les configs meteos",
        });
    }
};

function dayToDate(dayOfWeek) {
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
    console.log(today);

    //le chiffre qui correspond au jour d'aujourd'hui
    const currentDayOfWeek = today.getDay();

    //le chiffre qui correspond avec le jour passe en param
    const targetDayOfWeek = days.indexOf(dayOfWeek.toLowerCase());

    if (targetDayOfWeek === -1) {
        return "Jour de la semaine invalide";
    }

    /*
        on fait la difference entre
        le nombre qui correspond au jour en param
        et le nombre qui correspond a aujourd'ui
    */
    let daysToAdd = targetDayOfWeek - currentDayOfWeek;

    if (daysToAdd < 0) {
        daysToAdd += 7;
    }

    if (daysToAdd === 0) {
        /*
            Si le jour de la semaine demandé est aujourd'hui, 
            retourner la date d'aujourd'hui
        */
        const formattedDate = today.toISOString().split("T")[0];
        return formattedDate;
    }

    const targetDate = new Date();
    console.log(targetDate);
    /**
     * today.getDate() retourne le jour du mois de today, c'est-à-dire 19 dans notre exemple.
     * Nous ajoutons daysToAdd à cette valeur, soit 19 + 2 = 21.
     * Nous utilisons targetDate.setDate() pour définir le jour du mois de targetDate sur 21,
     * ce qui change la date pour le 21 juillet 2023.
     */
    targetDate.setDate(today.getDate() + daysToAdd);

    // Formater la date au format 'YYYY-MM-DD'
    const formattedDate = targetDate.toISOString().split("T")[0];
    return formattedDate;
}


module.exports = { saveMeteoConfig, displayMeteoConfig };
