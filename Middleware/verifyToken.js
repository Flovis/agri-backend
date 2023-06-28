const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.slit("")[1];

    if (!token) {
        return res.status(401).json({ message: "Token non fourni" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        console.log(req.userData)
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Token invalide" });
    }
};
