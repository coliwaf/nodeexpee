import { Router } from "express";
const router = Router();

import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../Controllers/ProductController.js";

router.route("/products")
	.get(getProducts)
	.post(createProduct);

router.route("/products/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct);

export { router };