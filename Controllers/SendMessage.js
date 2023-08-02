const db = require("../models/index");
const twilio = require("twilio");
const qrCode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { newProductMessage } = require("./Messages");

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

module.exports = { sendWhatsappMsg };
