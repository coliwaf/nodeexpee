import { Router } from "express";
const router = Router();

import { getPayDetails, createPayDetail, getPayDetailById, updatePayDetail, deletePayDetail } from "../Controllers/PayDetailController.js";

router.route("/pay_details")
	.get(getPayDetails)
	.post(createPayDetail);

router.route("/pay_details/:id")
	.get(getPayDetailById)
	.put(updatePayDetail)
	.delete(deletePayDetail);

export { router };