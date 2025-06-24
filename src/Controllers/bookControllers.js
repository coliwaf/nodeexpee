
import { Book as books } from "../Models/Book.js";

//get all books
const getBooks = async (req, res) => {
	const books = await Books.findAndCountAll();
	res.status(200).json({
		error: false,
		result:books
	})
}

//create new book
const postBook = async (req, res) => {
	const books = await Books.create(req.body);
	res.status(201).json({
		error: false,
		message: "Book Created",
		result:newBook
	})
}

//get book with id
const getBookById = async (req, res) => {
	const book = await Books.findByPk(req.params.id);
	res.status(200).json({
		error: false,
		message:`Book with id ${req.params.id} is fetched`,
		result:book
	})
}

//update a book with id
const updateBook = async (req, res) => {
	const isUpdated = await Books.update(req.body, {where: {id: req.params.id}});
	const book = await Books.findByPk(req.params.id);
	res.status(202).json({
		error: false,
		message: `Book with id ${req.params.id} is updated`,
		isUpdated: Boolean(isUpdated[0]),
		result:book
	})
}

//delete a book 
const deleteBook = async (req, res) => {
	const isDeleted = await Books.destroy({where: {id: req.params.id}});
	if (!isDeleted) throw new Error("Task not found");	
	res.status(204).json({
		error: false,
		message: `Book with id ${req.params.id} is deleted`,
		isUpdated: Boolean(isDeleted)
	}).send("deleted")
}

export {
	getBooks,
	postBook,
	getBookById,
	updateBook,
	deleteBook
}