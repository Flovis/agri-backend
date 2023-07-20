const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require("../models/index");
require("dotenv").config();

let userID;

const login = async (req, res, next) => {
    let token;

    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                succes: false,
                message: "Email ou mot de passe invalide",
            });
        }

        //comparaison des mots de passes
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                succes: false,
                message: "Email ou mot de passe invalide",
            });
        }
        //generate token
        try {
            token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET
            );

            userID = user.id;
            const getUserID = () => {
                return user.id;
            };
        } catch (err) {
            return res.status(400).json({
                succes: false,
                message: "Connexion Impossible",
            });
        }

        //Role
        try {
            const role = await db.User_Roles.findOne({
                where: { UserId: user.id },
            });
            if (role) {
                // console.log(role);
                const roleId = role.RoleId;
                res.status(200).json({
                    succes: true,
                    data: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        phone: user.phone_number,
                        city: user.city,
                        role: roleId,
                        token: token,
                        id_organisation: user.id_organisation,
                    },
                });
            }
        } catch (error) {
            console.log("Role error", error);
        }
    } catch (error) {
        res.status(400).json("Erreur de connexion");
    }
};

const getID = () => {
    if (userID) {
        return userID;
    } else {
        return console.log("impossible");
    }
};

module.exports = { login, userID, getID };
