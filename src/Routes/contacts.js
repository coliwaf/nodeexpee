import { Router } from "express";
const router = Router();

import { getContacts, createContact, getContactById, updateContact, deleteContact } from "../Controllers/ContactController.js";

router.route("/contacts")
	.get(getContacts)
	.post(createContact);

router.route("/contacts/:id")
	.get(getContactById)
	.put(updateContact)
	.delete(deleteContact);

export { router };