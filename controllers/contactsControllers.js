const { HttpError } = require("../helpers/HttpError");
const contactsService = require("../services/contactsServices");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const result = await contactsService.updateContact(id, {
      name,
      email,
      phone,
    });

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    if (!name && !email && !phone) {
      throw new HttpError(
        400,
        "At least one field (name, email, phone) must be present in the request body"
      );
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact,
};
