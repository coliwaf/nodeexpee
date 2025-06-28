import { Router } from "express";
const router = Router();

import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from "../Controllers/OrderController.js";

router.route("/orders")
	.get(getOrders)
	.post(createOrder);

router.route("/orders/:id")
	.get(getOrderById)
	.put(updateOrder)
	.delete(deleteOrder);

export { router };