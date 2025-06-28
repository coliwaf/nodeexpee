import { Customer } from "../Models/Customer.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getCustomers = async (req, res) => {
	//logged in customer if admin see's all customers if employee see' only their data
	const customers = await Customer.findAll();
	res.status(200).send(customers);

	/* 
	Customer.findAll({})
	.then((customers) => {
		res.json(customers);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create customer(s)
const createCustomer = async (req, res) => {
	// Customer can be employer, employee or customer
	await Customer.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Customer is inserted");
	res.status(201).send({ msg: 'Created Customer' });
};

//single customer
const getCustomerById = async (req, res) => {
	const requestedId = req.params.id;
	const customer = await Customer.findOne({ where: { id: requestedId } });
	//implement customer fetch fails
	res.status(200).send(customer);

	/* 
	Customer.findAll({})
	.then((customers) => {
		res.json(customers);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update customer
const updateCustomer = async (req, res) => {
	const requestedId = req.params.id;
	const customer = await Customer.findOne({ where: { id: requestedId } });
	customer.customername = req.body.customername;

	//update database
	customer.save();
	//implement customer fetch fails
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
	serverLog.info("Customer has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete customer
const deleteCustomer = async (req, res) => {
	const requestedId = req.params.id;
	await Customer.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Customer Removed!' });
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
	getCustomers,
	createCustomer,
	getCustomerById,
	updateCustomer,
	deleteCustomer
}