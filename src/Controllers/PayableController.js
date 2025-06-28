import { Payable } from "../Models/Payable.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getPayable = async (req, res) => {
	//logged in payable if admin see's all payable if employee see' only their data
	const payable = await Payable.findAll();
	res.status(200).send(payable);

	/* 
	Payable.findAll({})
	.then((payable) => {
		res.json(payable);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create payable(s)
const createPayable = async (req, res) => {
	// Payable can be employer, employee or customer
	await Payable.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Payable is inserted");
	res.status(201).send({ msg: 'Created Payable' });
};

//single payable
const getPayableById = async (req, res) => {
	const requestedId = req.params.id;
	const payable = await Payable.findOne({ where: { id: requestedId } });
	//implement payable fetch fails
	res.status(200).send(payable);

	/* 
	Payable.findAll({})
	.then((payable) => {
		res.json(payable);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update payable
const updatePayable = async (req, res) => {
	const requestedId = req.params.id;
	const payable = await Payable.findOne({ where: { id: requestedId } });
	payable.payablename = req.body.payablename;

	//update database
	payable.save();
	//implement payable fetch fails
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
	serverLog.info("Payable has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete payable
const deletePayable = async (req, res) => {
	const requestedId = req.params.id;
	await Payable.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Payable Removed!' });
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
	getPayable,
	createPayable,
	getPayableById,
	updatePayable,
	deletePayable
}