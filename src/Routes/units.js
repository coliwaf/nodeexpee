import { Router } from "express";
const router = Router();

import { getUnits, createUnit, getUnitById, updateUnit, deleteUnit } from "../Controllers/UnitController.js";

router.route("/units")
	.get(getUnits)
	.post(createUnit);

router.route("/units/:id")
	.get(getUnitById)
	.put(updateUnit)
	.delete(deleteUnit);

export { router };