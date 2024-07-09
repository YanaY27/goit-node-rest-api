import { HttpError } from "../helpers/HttpError.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await contactsService.listContacts({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.getContactById(id, owner);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsService.removeContact(id, owner);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;
    const result = await contactsService.addContact({
      name,
      email,
      phone,
      favorite,
      owner,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;
    if (!name && !email && !phone && favorite === undefined) {
      throw HttpError(400, "At least one field must be filled");
    }
    const result = await contactsService.updateContactById(
      id,
      { name, email, phone, favorite },
      owner
    );
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const { _id: owner } = req.user;

    if (favorite === undefined) {
      throw HttpError(400, '"favorite" is required');
    }

    const updatedContact = await contactsService.updateContactById(
      id,
      { favorite },
      owner
    );

    if (!updatedContact) {
      throw HttpError(404, "Contact not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
