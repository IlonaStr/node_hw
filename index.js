const {listContacts, getContactById, removeContact, addContact} = require("./contacts")

const argv = require('yargs').argv;
const contactsList = require('./contacts');

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        contactsList.listContacts();
        break;
  
      case 'get':
        contactsList.getContactById();
        break;
  
      case 'add':
        contactsList.addContact(name, email, phone);
        break;
  
      case 'remove':
        contactsList.removeContact(id);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  
  invokeAction(argv);