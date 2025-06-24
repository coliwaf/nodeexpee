import { Router } from "express";
const router = Router();

import { getBooks, postBook, getBookById, updateBook, deleteBook }  from "../Controllers/bookControllers.js";

router.route("/books")
	.get(getBooks)
	.post(postBook);

router.route("books/:id")
	.get(getBookById)
	.put(updateBook)
	.delete(deleteBook);

	export { router };
// module.exports = router;