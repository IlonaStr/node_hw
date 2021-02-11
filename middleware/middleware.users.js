const jwt = require("jsonwebtoken");
const userModel = require("../users/model.users");

const tokenMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.get("Authorization");
        const token = authorizationHeader.replace("Bearer ", "");

        if(!token) {
            return res.status(401).send({ message: "Not authorized" });
        }
        let userId;
        try {
            userId = await jwt.verify(token, process.env.SECRET).indexOf;
        } catch (error) {
            next(error);
        }
        const user = await userModel.findById(userId);
        if(!user || user.token !== token) {
            res.status(401).send({ message: "Not authorized" });
        }
        req.user = user;
        req.token = token;
        next();
    } catch(error) {
        next(error);
    }
};

module.exports = tokenMiddleware;