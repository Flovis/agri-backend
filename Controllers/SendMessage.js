const db = require("../models/index");
const twilio = require("twilio");
// const {getIo} = require("")
const sendtoAllUsers = async (req, res) => {

    const SID = "AC36d8fb4105aa41dd499520be49068a12";
    const TOKEN = "ae4aef02138d5d3ecfbfd414923b4877";
    const number = "+14155238886";

    const client = twilio(SID, TOKEN);
    const message = `Bojour  est um message au test au num: de la part de agriTech. Flo`;
    console.log(message);
    console.log(client.messages);

    try {
        const response = client.messages
            .create({
                from: "whatsapp:+14155238886",
                body: message,
                to: "whatsapp:+243824092951",
                mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
                

            })
            .then((message) => console.log(message.sid));
        console.log("Message envoyé avec succès :", response.sid);
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
    }

};

const sendMessage = async (phoneNumbers, content) => {
    const SID = "AC36d8fb4105aa41dd499520be49068a12";
    const TOKEN = "ae4aef02138d5d3ecfbfd414923b4877";
    const senderNumber = "+14155238886";

    const client = require("twilio")(SID, TOKEN);

    try {
        for (const phoneNumber of phoneNumbers) {
            const response = await client.messages.create({
                body: content,
                from: `whatsapp:${senderNumber}`,
                to: `whatsapp:${phoneNumber}`,
                mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
            });
            console.log(`Message envoyé au numéro ${phoneNumber}. SID : ${response.sid}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
    }
};

module.exports = { sendtoAllUsers, sendMessage };
