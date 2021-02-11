const contactModel = require("./model");

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
    try { const { contactId } = req.params;
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

module.exports = {
    addContact, listContacts, getContactById, deleteContact, updateContact,
}