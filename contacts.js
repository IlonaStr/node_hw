const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");


async function listContacts() {
  try {
      const getData = await fs.promises.readFile(contactsPath, "utf-8");
      const data = JSON.parse(getData);
      console.table(data);
  } catch (error) {
      console.error("Contact doesn't exist", error)
  }
}

async function getContactById(id) {
  try {
      const getData = await fs.promises.readFile(contactsPath, "utf-8");
      const data = JSON.parse(getData);
      const contactWithId = data.find(({ contact }) => id === id);
      console.table(contactWithId);
  } catch(error) {
      console.log(error);
  }
}

async function removeContact(id) {
  try{
      const getData = await fs.promises.readFile(contactsPath, "utf-8");
      const data = JSON.parse(getData);
      const contacts = data.filter((contact) => contact.id !== id);
      await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
      console.table(contacts);
  } catch (error) {
      console.log(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
  };
  try {
      const getData = await fs.promises.readFile(contactsPath, "utf-8");
      const data = JSON.parse(getData);
      const newContactsList = [...data, newContact];
      await fs.promises.writeFile(contactsPath, JSON.stringify(newContactsList));
      console.table(newContactsList);
  } catch (error) {
      console.log(error);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}