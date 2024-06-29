// controllers/contactsControllers.js
import * as contactsService from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const result = await contactsService.addContact(
      name,
      email,
      phone,
      favorite
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (!name && !email && !phone && favorite === undefined) {
      throw HttpError(400, "At least one field must be filled");
    }

    const result = await contactsService.updateContactById(id, {
      name,
      email,
      phone,
      favorite,
    });

    if (!result) {
      throw HttpError(404, "Not found");
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

    if (favorite === undefined) {
      throw HttpError(400, '"favorite" is required');
    }

    const updatedContact = await contactsService.updateStatusContact(id, {
      favorite,
    });

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
