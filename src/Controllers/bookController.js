import { Book } from "../Models/Book.js";

//get all books
const getBook = async (req, res) => {
	const books = await Book.findAndCountAll();
	res.status(200).json({
		error: false,
		result:books
	})
}

//create new book
const postBook = async (req, res) => {
	const books = await Book.create(req.body);
	res.status(201).json({
		error: false,
		message: "Book Created",
		result:newBook
	})
}

//get book with id
const getBookById = async (req, res) => {
	const book = await Book.findByPk(req.params.id);
	res.status(200).json({
		error: false,
		message:`Book with id ${req.params.id} is fetched`,
		result:book
	})
}

//update a book with id
const updateBook = async (req, res) => {
	const isUpdated = await Book.update(req.body, {where: {id: req.params.id}});
	const book = await Book.findByPk(req.params.id);
	res.status(202).json({
		error: false,
		message: `Book with id ${req.params.id} is updated`,
		isUpdated: Boolean(isUpdated[0]),
		result:book
	})
}

//delete a book 
const deleteBook = async (req, res) => {
	const isDeleted = await Book.destroy({where: {id: req.params.id}});
	if (!isDeleted) throw new Error("Task not found");	
	res.status(204).json({
		error: false,
		message: `Book with id ${req.params.id} is deleted`,
		isUpdated: Boolean(isDeleted)
	}).send("deleted")
}

export {
	getBook,
	postBook,
	getBookById,
	updateBook,
	deleteBook
}