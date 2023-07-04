const db = require("../models/index");
const twilio = require("twilio");

const SID = "AC36d8fb4105aa41dd499520be49068a12";
const TOKEN = "f4e91ebaafdeaa30ecd75304d053af5f";
const number = "+14176412116";

const sendtoAllUsers = async (req, res) => {
    const client = twilio(SID, TOKEN);
    const message = `Bojour  est um message au test au num: de la part de agriTech. Flo`;
    console.log(message);
    console.log(client.messages);
    try {
        const response = await client.messages.create({
            body: message,
            from: `whatsapp:${number}`,
            to: `whatsapp:+243824092951`,
        });
        console.log("Message envoyé avec succès :", response.sid);
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
    }

    // .then((response) => {
    //     console.log("Message envoyé avec succès :", response.sid);
    // })
    // .catch((error) => {
    //     console.error("Erreur lors de l'envoi du message :");
    // });
    // try {
    //     const users = await db.User.findAll();

    //     if (users) {
    //         console.log(users?.length);

    //         users.map((user) => {
    //             const message = `Bojour ${user.username} ceci est um message au test au num:${user.phone_number} de la part de agriTech. Flo`;
    //             console.log(message);
    //             console.log(client.messages)
    //             client.messages
    //                 .create({
    //                     body: message,
    //                     from: `whatsapp:${number}`,
    //                     to: `whatsapp:${user.phone_number}`,
    //                 })
    //                 .then((response) => {
    //                     console.log(
    //                         "Message envoyé avec succès :",
    //                         response.sid
    //                     );
    //                 })
    //                 .catch((error) => {
    //                     console.error(
    //                         "Erreur lors de l'envoi du message :",

    //                     );
    //                 });
    //         });
    //     }
    // } catch (error) {
    //     res.status(401).json({
    //         message: "req impossible",
    //     });
    // }
};

module.exports = { sendtoAllUsers };
