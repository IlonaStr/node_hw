const { Router } = require('express');
const {
    addContact, listContacts, getContactById, deleteContact, updateContact,
} = require('./controller');
const contactsRouter = Router();

contactsRouter.post('/contacts', validateAddContact, addContact);
contactsRouter.get('/contacts', listContacts);
contactsRouter.get('/contacts/:contactId', getContactById);
contactsRouter.delete('/contacts/:contactId', validateId, deleteContact);
contactsRouter.patch('/contacts/contactId', validateUpdateContact, updateContact);

module.exports = contactsRouter;