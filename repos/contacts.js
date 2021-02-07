const {v4: uuidv4} = require('uuid');

class Contacts {
    constructor() {
        this.contacts = new Map();
    }
    getContacts() {
        return Array.from(this.contacts.values());
    }
    getContact(id) {
        return this.contacts.get(id);
    }
    addContact(id, data) {
        this.contacts.set(id, data);
        return this.contacts.get(id)
    }
    updateContact(id, data) {
        const contact = this.contacts.get(id);
        this.contacts.set(id, { ...contact, ...data });
        return this.contacts.get(id);
    }
    deleteContact(id) {
        this.contacts.delete(id);
    }
}
module.exports = new Contacts();