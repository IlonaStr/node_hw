const Joi = require('joi');
const { Types: { ObjectId }, } = require("mongoose");

const validateAddContact = (req, res, next) => {
    const validationRules = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
    });

    const validateResult = Joi.validate(req.body, validationRules);
    if(validateResult.error) {
        return res.status(400).send(validateResult.error);
    }
    next();
}

const validateUpdateContact = (req, res, next) => {

    const validationRules = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
    });

    const validateResult = Joi.validate(req.body, validationRules);
    if(validateResult.error) {
        return res.status(400).send(validateResult.error);
    }
    next();
}

const validateId = (req, res, next) => {
    const { contactId } = req.params;
    if(!ObjectId.isValid(contactId)) {
        return res.status(400).send({ message: "Can't find any contacts" })
    }
    next();
};

module.exports = { validateAddContact, validateUpdateContact, validateId }