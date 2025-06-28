import { Router } from "express";
const router = Router();

import { getOrderDetails, createOrderDetail, getOrderDetailById, updateOrderDetail, deleteOrderDetail } from "../Controllers/OrderDetailController.js";

router.route("/order_details")
	.get(getOrderDetails)
	.post(createOrderDetail);

router.route("/order_details/:id")
	.get(getOrderDetailById)
	.put(updateOrderDetail)
	.delete(deleteOrderDetail);

export { router };