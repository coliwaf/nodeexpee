import { Router } from "express";
const router = Router();

import { getPayments, createPayment, getPaymentById, updatePayment, deletePayment } from "../Controllers/PaymentController.js";

router.route("/payments")
	.get(getPayments)
	.post(createPayment);

router.route("/payments/:id")
	.get(getPaymentById)
	.put(updatePayment)
	.delete(deletePayment);

export { router };