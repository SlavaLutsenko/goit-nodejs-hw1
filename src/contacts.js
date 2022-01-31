const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err));
}

function getContactById(id) {
  fs.readFile(contactsPath)
    .then((data) => {
      const filtCont = JSON.parse(data).filter((el) => {
        return +el.id === id;
      });
      console.table(filtCont);
    })
    .catch((err) => console.log(err));
}

function removeContact(id) {
  fs.readFile(contactsPath)
    .then((data) => {
      const filtCont = JSON.parse(data).filter((el) => {
        return +el.id !== id;
      });
      fs.writeFile(contactsPath, JSON.stringify(filtCont));
    })
    .catch((err) => console.log(err));
  setTimeout(() => {
    listContacts();
  }, 1000);
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      const newContacts = [...data, { id: nanoid(), name, email, phone }];
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .catch((err) => console.log(err));
  setTimeout(() => {
    listContacts();
  }, 1000);
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
