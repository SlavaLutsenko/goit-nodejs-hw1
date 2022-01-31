const argv = require("yargs").argv;
const actions = require("./src/contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("list");
      actions.listContacts();
      break;

    case "get":
      console.log("id", id);
      actions.getContactById(id);
      break;

    case "add":
      console.log("name email phone", name, email, phone);
      actions.addContact(name, email, phone);
      break;

    case "remove":
      console.log("id", id);
      actions.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
