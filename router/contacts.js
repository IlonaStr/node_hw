const ContactsController = require('../controllers/ContactsController');
const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();

const contactsController = new ContactsController();

router.get('/', (req, res) => res.send(contactsController.listContacts()));

router.get('/:contactId', (req, res) => {
    const { params: { contactId } } = req;
    const hasContact = ContactsController.validateContact(contactId);
    if(!hasContact) {
        res.status(404).send({ message: "Not found" })
    }
    res.status(200).send(contactsController.getById(contactId));
})

router.post('/', (req, res) => {
    const { body } = req;
    body.id = uniqid.time();
    if(!body.name || !body.phone) {
        res.status(400).send({ message: "Required name or phone is missing" })
    }
    return res.status(201).send(contactsController.addContact(body.id, body))
});

router.patch('/:contactId', (req, res) => {
    const { body } = req;
    const { params: { contactId } } = req;
    const hasContact = contactsController.validateContact(contactId);
    const isEmptyBody = Object.keys(body).length < 1;
    if(isEmptyBody) {
        res.status(400).send({ message: "Fields are missing" })
    };
    if(!hasContact) {
        res.status(404).send({ message: "Not found" })
    };
    return res.status(200).send(contactsController.updateContact(contactId, body))
});

router.delete('/:contactId', (req, res) => {
    const { params: { contactId } } = req;
    const hasContact = contactsController.validateContact(contactId);
    if(!hasContact) {
        res.status(404).send({ message: "Not found" })
    };
    contactsController.removeContact(contactId)
    return res.status(200).send({ message: "Contact is deleted" })
})
module.exports = router;