import { Router } from "express";
const router = Router();

import { getMaterials, createMaterial, getMaterialById, updateMaterial, deleteMaterial } from "../Controllers/MaterialController.js";

router.route("/materials")
	.get(getMaterials)
	.post(createMaterial);

router.route("/materials/:id")
	.get(getMaterialById)
	.put(updateMaterial)
	.delete(deleteMaterial);

export { router };