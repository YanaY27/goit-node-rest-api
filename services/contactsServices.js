import { v4 as uuidv4 } from "uuid";
import Contact from "../models/contact.js";

export async function listContacts(owner) {
  return await Contact.find({ owner }).populate("owner", "email subscription");
}

export async function getContactById(contactId, owner) {
  return await Contact.findOne({ _id: contactId, owner });
}

export async function removeContact(contactId, owner) {
  return await Contact.findOneAndRemove({ _id: contactId, owner });
}

export async function addContact(name, email, phone, favorite = false, owner) {
  const newContact = new Contact({
    id: uuidv4(),
    name,
    email,
    phone,
    favorite,
    owner,
  });
  return await newContact.save();
}

export async function updateContactById(contactId, updatedFields, owner) {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    updatedFields,
    { new: true }
  );
}

export async function updateStatusContact(contactId, { favorite }, owner) {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );
}
