const db = require("../models/index");
const accountid = "AC36d8fb4105aa41dd499520be49068a12";
const client = require("twilio")(accountid, authToken);
const authToken = "ae4aef02138d5d3ecfbfd414923b4877";


const sendOnPlanProd = async (req, res) => {
await client.messages
    .create({
        body: "Your appointment is coming up on July 21 at 3PM",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+243824092951",
    })
    .then((message) => console.log(message.sid))

};
