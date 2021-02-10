const Joi = require('joi');
const contactModel = require("./model");
const { Types: { ObjectId }, } = require("mongoose");

const addContact = async (req, res, next) => {
    try {
        const contact = await contactModel.create(req.body);
        return res.status(201).json(contact);
    } catch (error) {
     next(error);
    }
};

const listContacts = async (req, res, next) => {
    try { const contacts = await contactModel.find();
    return res.status(200).json(contacts);
} catch (error) {
    next(error);
}
};

const getContactById = async (req, res, next) => {
    try { const contactId = req.params.contactId;
    const contactById = await contactModel.findById(contactId);
    if (!contactById) {
        return res.status(404).send({ message: "Not found" });
    }
    return res.status(200).json(contactById);
} catch (error) {
    next(error);
}
}

const deleteContact = async (req, res, next) => {
    try { const { contactId } = req.params;
    const deletedContact = await contactModel.findByIdAndDelete(contactId);
    if(!deletedContact) {
        res.status(400).send({ message: "Can't find the contact" });
    }
    return res.status(200).send({ message: "Contact deleted" });
} catch (error) {
    next(error);
}
};

const updateContact = async (req, res, next) => {
    try { const { contactId } = req.params;
    const updatedContact = await contactModel.findByIdAndUpdate (
        contactId, { $set: req.body,},
        { new: true }
    );
    if(!updatedContact) {
        return res.status(404).send({ message: "Can't find the contact" });
    } 
    return res.status(200).json(updatedContact);
} catch (error) {
    next(error);
}
};

const validateAddContact = (req, res, next) => {
    const validationRules = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
    });
    const validateResult = validationRules.validate(req.body);
    if(validateResult.error) {
        return res.status(400).send(validateResult.error);
    }
    next();
}

validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
    }).min(1);
    const validateResult = validationRules.validate(req.body);
    if(validateResult.error) {
        return res.status(400).send(validateResult.error)
    }
    next();
}

validateId(req, res, next) {
    const contactId = req.params;
    if(!ObjectId.isValid(contactId)) {
        return res.status(400).send()
    }
    next()
}

module.exports = {
    addContact, listContacts, getContactById, deleteContact, updateContact,
}