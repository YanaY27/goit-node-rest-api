const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
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

async function updateContactById(req, res, next) {
  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    if (!updatedContact) {
      throw new HttpError("Not found", 404);
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
