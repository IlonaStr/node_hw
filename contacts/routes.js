const { Router } = require('express');
const {
    addContact, listContacts, getContactById, deleteContact, updateContact,
} = require('./controller');
const contactsRouter = Router();

const { validateAddContact, validateUpdateContact, validateId } = require("./validation");

contactsRouter.post('/contacts', validateAddContact, addContact);
contactsRouter.get('/contacts', listContacts);
contactsRouter.get('/contacts/:contactId', validateId, getContactById);
contactsRouter.delete('/contacts/:contactId', validateId, deleteContact);
contactsRouter.patch('/contacts/:contactId', validateId, validateUpdateContact, updateContact);

module.exports = contactsRouter;