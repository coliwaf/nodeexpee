import { Router } from "express";
const router = Router();

import { getPayable, createPayable, getPayableById, updatePayable, deletePayable } from "../Controllers/PayableController.js";

router.route("/payable")
	.get(getPayable)
	.post(createPayable);

router.route("/payable/:id")
	.get(getPayableById)
	.put(updatePayable)
	.delete(deletePayable);

export { router };