const Joi = require("joi");

const validateSignIn = (req, res, next) => {
    const signInRules = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const signInValidationRes = Joi.validate(req.body, signInRules);
    if(signInValidationRes.error) {
        return res.status(400).send(signInValidationRes.error);
    }
    return next();
}

module.exports = { validateSignIn };