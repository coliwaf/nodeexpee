import { Payment } from "../Models/Payment.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getPayments = async (req, res) => {
	//logged in payment if admin see's all payments if employee see' only their data
	const payments = await Payment.findAll();
	res.status(200).send(payments);

	/* 
	Payment.findAll({})
	.then((payments) => {
		res.json(payments);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create payment(s)
const createPayment = async (req, res) => {
	// Payment can be employer, employee or customer
	await Payment.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Payment is inserted");
	res.status(201).send({ msg: 'Created Payment' });
};

//single payment
const getPaymentById = async (req, res) => {
	const requestedId = req.params.id;
	const payment = await Payment.findOne({ where: { id: requestedId } });
	//implement payment fetch fails
	res.status(200).send(payment);

	/* 
	Payment.findAll({})
	.then((payments) => {
		res.json(payments);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update payment
const updatePayment = async (req, res) => {
	const requestedId = req.params.id;
	const payment = await Payment.findOne({ where: { id: requestedId } });
	payment.paymentname = req.body.paymentname;

	//update database
	payment.save();
	//implement payment fetch fails
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
	serverLog.info("Payment has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete payment
const deletePayment = async (req, res) => {
	const requestedId = req.params.id;
	await Payment.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Payment Removed!' });
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
	getPayments,
	createPayment,
	getPaymentById,
	updatePayment,
	deletePayment
}