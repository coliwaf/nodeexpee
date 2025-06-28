import { Category } from "../Models/Category.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getCategories = async (req, res) => {
	//logged in category if admin see's all categories if employee see' only their data
	const categories = await Category.findAll();
	res.status(200).send(categories);

	/* 
	Category.findAll({})
	.then((categories) => {
		res.json(categories);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create category(s)
const createCategory = async (req, res) => {
	// Category can be employer, employee or customer
	await Category.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Category is inserted");
	res.status(201).send({ msg: 'Created Category' });
};

//single category
const getCategoryById = async (req, res) => {
	const requestedId = req.params.id;
	const category = await Category.findOne({ where: { id: requestedId } });
	//implement category fetch fails
	res.status(200).send(category);

	/* 
	Category.findAll({})
	.then((categories) => {
		res.json(categories);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update category
const updateCategory = async (req, res) => {
	const requestedId = req.params.id;
	const category = await Category.findOne({ where: { id: requestedId } });
	category.categoryname = req.body.categoryname;

	//update database
	category.save();
	//implement category fetch fails
	/* 
	const isUpdated = await Book.update(req.body, {where: {id: req.params.id}});
	const book = await Book.findByPk(req.params.id);
	res.status(202).json({
		error: false,
		message: `Book with id ${req.params.id} is updated`,
		isUpdated: Boolean(isUpdated[0]),
		result:book
	})
	*/
	serverLog.info("Category has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete category
const deleteCategory = async (req, res) => {
	const requestedId = req.params.id;
	await Category.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Category Removed!' });
	/* 
		const isDeleted = await Book.destroy({where: {id: req.params.id}});
		if (!isDeleted) throw new Error("Task not found");	
		res.status(204).json({
			error: false,
			message: `Book with id ${req.params.id} is deleted`,
			isUpdated: Boolean(isDeleted)
		}).send("deleted")
	*/
};

export {
	getCategories,
	createCategory,
	getCategoryById,
	updateCategory,
	deleteCategory
}