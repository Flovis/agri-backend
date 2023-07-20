const cron = (io) => {
    io.on("NouveauPlan", (data) => {
        console.log("From cron", data);
        console.log("IO", io)

    });


    console.log("In function");

    // const dates = [
    //     { semence: "09/07/2023" },
    //     { croissance: "12/06/2023" },
    //     { recolte: "15/06/2023" },
    //     { conditionnement: "17/06/2023" },
    // ];
    // const data = [
    //     "precipitations",
    //     "Vent fort",
    //     "ensoleille",
    //     "nuageux",
    //     "pluivieux",
    // ];
    // dates.forEach((date) => {
    //     const cycle = Object.keys(date)[0];
    //     const [day, month, year] = date[cycle].split("/");
    //     cron.schedule(`46 22 ${day} ${month} *`, () => {
    //         if (cycle === "semence") {
    //             console.log("semence");
    //             data.forEach((weather) => {
    //                 if (weather === "precipitations") {
    //                     console.log("il y a une grande précipitation");
    //                 } else if (weather === "Vent fort") {
    //                     console.log("vent fort");
    //                 } else if (weather === "ensoleille") {
    //                     console.log("ensoleillé");
    //                 } else if (weather === "nuageux") {
    //                     console.log("nuageux");
    //                 } else if (weather === "pluivieux") {
    //                     console.log("pluvieux");
    //                 }
    //             });
    //         } else if (cycle === "croissance") {
    //             console.log("croissance");
    //         } else if (cycle === "recolte") {
    //             console.log("récolte");
    //         } else if (cycle === "conditionnement") {
    //             console.log("conditionnement");
    //         }
    //     });
    // });
};
module.exports = { cron };
