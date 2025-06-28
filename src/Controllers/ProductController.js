import { Product } from "../Models/Product.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getProducts = async (req, res) => {
	//logged in product if admin see's all products if employee see' only their data
	const products = await Product.findAll();
	res.status(200).send(products);

	/* 
	Product.findAll({})
	.then((products) => {
		res.json(products);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create product(s)
const createProduct = async (req, res) => {
	// Product can be employer, employee or customer
	await Product.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Product is inserted");
	res.status(201).send({ msg: 'Created Product' });
};

//single product
const getProductById = async (req, res) => {
	const requestedId = req.params.id;
	const product = await Product.findOne({ where: { id: requestedId } });
	//implement product fetch fails
	res.status(200).send(product);

	/* 
	Product.findAll({})
	.then((products) => {
		res.json(products);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update product
const updateProduct = async (req, res) => {
	const requestedId = req.params.id;
	const product = await Product.findOne({ where: { id: requestedId } });
	product.productname = req.body.productname;

	//update database
	product.save();
	//implement product fetch fails
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
	serverLog.info("Product has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete product
const deleteProduct = async (req, res) => {
	const requestedId = req.params.id;
	await Product.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Product Removed!' });
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
	getProducts,
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct
}