const db = require("../models/index");
const twilio = require("twilio");
const qrCode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { newProductMessage } = require("./Messages");

const sendtoAllUsers = async (req, res) => {
    const SID = "AC36d8fb4105aa41dd499520be49068a12";
    const TOKEN = "ae4aef02138d5d3ecfbfd414923b4877";
    const number = "+14155238886";

    const client = twilio(SID, TOKEN);
    const message = `Bojour  est um message au test au num: de la part de agriTech. Flo`;
    // console.log(message);
    // console.log(client.messages);

    try {
        const response = client.messages
            .create({
                from: "whatsapp:+14155238886",
                body: message,
                to: "whatsapp:+243824092951",
                mediaUrl: [
                    "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
                ],
            })
            .then((message) => console.log(message.sid));
        console.log("Message envoyé avec succès :", response.sid);
    } catch (error) {
        console.error("Erreur lors de l'envoi du message :", error);
    }
};

// const sendMessage = async (phoneNumbers, content) => {
//     const SID = "AC36d8fb4105aa41dd499520be49068a12";
//     const TOKEN = "ae4aef02138d5d3ecfbfd414923b4877";
//     const senderNumber = "+14155238886";

//     const client = require("twilio")(SID, TOKEN);

//     try {
//         for (const phoneNumber of phoneNumbers) {
//             const response = await client.messages.create({
//                 body: content,
//                 from: `whatsapp:${senderNumber}`,
//                 to: `whatsapp:${phoneNumber}`,
//                 mediaUrl: [
//                     "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
//                 ],
//             });
//             console.log(
//                 `Message envoyé au numéro ${phoneNumber}. SID : ${response.sid}`
//             );
//         }
//     } catch (error) {
//         console.error("Erreur lors de l'envoi du message :", error);
//     }
// };

const sendWhatsappMsg = async (message, phoneNumber) => {
    const client = new Client({
        authStrategy: new LocalAuth(),
    });

    client.on("qr", (qr) => {
        qrCode.generate(qr, { small: true });
    });

    client.on("ready", async () => {
        console.log("Client is ready");

       
        const sanitized_number = phoneNumber.toString().replace(/[-+ )(]/g, "");
        const number_details = await client.getNumberId(sanitized_number); // get mobile number details

        if (number_details) {
            console.log(number_details._serialized);
            await client
                .sendMessage(number_details._serialized, message)
                .then(() => {
                    console.log("Message envoyé avec succès.");
                    setTimeout(() => {
                        client.destroy(); // Fermer la session WhatsApp Web après un délai de 3 secondes
                    }, 5000);
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi du message :", error);
                    client.destroy();
                });
        } else {
            console.log("not whatsapp number");
        }
    });

    client.initialize();
};

// const cleanNumber =async (number) =>{
//     const sanitized_number = number.toString().replace(/[-+ )(]/g, "");
//     const number_details = await client.getNumberId(sanitized_number);
// }

module.exports = { sendtoAllUsers, sendWhatsappMsg };
