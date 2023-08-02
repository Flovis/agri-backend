// allowedRole est un tab qu'on va passer en param
//contenant les roles autorises pour un route
const checkRole = (allowedRole) => {
    return (req, res, next) => {
        if (!allowedRole.includes(req.userData.role)) {
            return res.status(403).json({
                success: false,
                message: "Pas d'acces",
            });
            next();
        }
    };
};

