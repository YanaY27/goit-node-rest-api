import { v4 as uuidv4 } from "uuid";
import Contact from "../models/contact.js";

export async function listContacts() {
  return await Contact.find();
}

export async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

export async function removeContact(contactId) {
  return await Contact.findByIdAndRemove(contactId);
}

export async function addContact(name, email, phone, favorite = false) {
  const newContact = new Contact({
    id: uuidv4(),
    name,
    email,
    phone,
    favorite,
  });
  return await newContact.save();
}

export async function updateContactById(contactId, updatedFields) {
  return await Contact.findByIdAndUpdate(contactId, updatedFields, {
    new: true,
  });
}

export async function updateStatusContact(contactId, { favorite }) {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
}
