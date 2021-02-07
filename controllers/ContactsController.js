const contactsRepository = require('../repos/contacts');
const { v4: uuidv4 } = require('uuid');

class ContactsController {
    listContacts () {
        return contactsRepository.getContacts();
    }
    getById (id) {
        return contactsRepository.getContact(id);
    }
    addContact (id, data) {
        return contactsRepository.addContact(id, data);
    }
    validateContact (id) {
        const contact = contactsRepository.getContact(id);
        return !!contact
    }
    updateContact(id, data) {
        return contactsRepository.updateContact(id, data);
    }
    removeContact (id) {
        return contactsRepository.deleteContact(id);
    }
}

module.exports = ContactsController;