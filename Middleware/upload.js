const multer = require("multer");
const mimeTypes = require("mime-types");

const fs = require("fs");
const uploadFolder = "uploads";
// verifie if folder existe or create
if (!fs.existsSync(uploadFolder)) {
    console.log("not existe");
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadFolder);
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = mimeTypes.extension(file.mimetype);
        callback(null, name + "_" + Date.now() + "." + extension);
    },
});
// const fileFilter = (req, file, callback) => {
//     const category = req.body.category.toLowerCase();
//     if (category == "video" || category == "audio") {
//         if (file.mimetype.startsWith(`${category}/`)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Invalid file type.", false));
//             req.fileError = "Fichier Invalide";
//         }
//     }
//     if (category == "text") {
//         if (
//             file.mimetype.startsWith("text/") ||
//             file.mimetype === "application/pdf" ||
//             file.mimetype === "application/msword" ||
//             file.mimetype ===
//                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//             file.mimetype === "application/vnd.ms-excel" ||
//             file.mimetype ===
//                 "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//             file.mimetype === "application/vnd.ms-powerpoint" ||
//             file.mimetype ===
//                 "application/vnd.openxmlformats-officedocument.presentationml.presentation"
//         ) {
//             callback(null, true);
//         } else {
//             callback(new Error("Invalid file type.", false));
//             req.fileError = "Fichier Invalide";
//         }
//     }
// };
const upload = multer({ storage });
module.exports = upload;
