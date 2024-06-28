import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/(\w:\/)/, "$1")
);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

export async function listContacts() {
  return await readContacts();
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

export async function updateContactById(contactId, updatedFields) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  Object.assign(contacts[index], updatedFields);
  await writeContacts(contacts);
  return contacts[index];
}
