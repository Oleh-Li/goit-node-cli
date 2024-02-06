import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export async function listContacts() {
    const contactsList = await fs.readFile(contactsPath)
    return JSON.parse(contactsList)
}

export async function getContactById(contactId) {
    const list = await listContacts()
    const result = list.find(item => item.id === contactId)
    return result || null
}

export async function removeContact(contactId) {
    const list = await listContacts()
    const index = list.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    const [result] = list.splice(index, 1)
    fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
    return result
}

export async function addContact(name, email, phone) {
    const list = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    list.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(list, null, 2))
    return newContact
}
