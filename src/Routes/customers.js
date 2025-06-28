import { Router } from "express";
const router = Router();

import { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from "../Controllers/CustomerController.js";

router.route("/customers")
	.get(getCustomers)
	.post(createCustomer);

router.route("/customers/:id")
	.get(getCustomerById)
	.put(updateCustomer)
	.delete(deleteCustomer);

export { router };