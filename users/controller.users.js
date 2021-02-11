const userModel = require("./model.users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userResponse = require("../constructors/errors.constructor");

const registrationRequest = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const findUserByEmail = await userModel.findOne({ email });

        if (findUserByEmail) {
            return res.status(409).send({ message: "Email is used" });
        }
        const saltRounds = 6;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create({ email, password: passwordHash });
        res.status(201).send({
            email: newUser.email,
            subscription: newUser.subscription,
        });
    } catch (error) {
        return next(error);
    }
};
const loginRequest = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if(!user) {
            return res.status(401).send({ message: "Email or password is wrong" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).send({ message: "Email or password is wrong" })
        }
        const newToken = await jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: "24h",
        });
        const userToken = await userModel.findByIdAndUpdate(user.id, {
            token: newToken,
        });
        res.status(200).json({
            token: newToken,
            email: userToken.email,
            subscription: userToken.subscription,
        })
    } catch(error) {
        return next(error);
    }
};

const logoutRequest = async (req, res, next) => {
    try {
        const user = req.user;
        await userModel.findByIdAndUpdate(user._id, { token: null });
        return res.status(204).send();
    } catch (error) {
        return next (error)
    }
};

const currentUserRequest = async (req, res, next) => {
    try {
        const { user } = userResponse(req.user);
        return res.status(200).send(user);
    } catch (error)  {
        return next (error);
    }
};

module.exports = { registrationRequest, loginRequest, logoutRequest, currentUserRequest }