import { Router } from "express";
const router = Router();

import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from "../Controllers/CategoryController.js";

router.route("/categories")
	.get(getCategories)
	.post(createCategory);

router.route("/categories/:id")
	.get(getCategoryById)
	.put(updateCategory)
	.delete(deleteCategory);

export { router };