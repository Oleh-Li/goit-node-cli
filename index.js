import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js"

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const list = await listContacts()
            console.log("list==>", list)
            break;

        case "get":
            const contactById = await getContactById(id)
            console.log("contactById==>", contactById)
            break;

        case "add":
            const newContact = await addContact(name, email, phone)
            console.log("newContact==>", newContact)
            break;

        case "remove":
            const removedById = await removeContact(id)
            console.log("removedById==>", removedById)
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);
