import { PayDetail } from "../Models/PayDetail.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getPayDetails = async (req, res) => {
	//logged in pay_detail if admin see's all pay_details if employee see' only their data
	const pay_details = await PayDetail.findAll();
	res.status(200).send(pay_details);

	/* 
	PayDetail.findAll({})
	.then((pay_details) => {
		res.json(pay_details);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create pay_detail(s)
const createPayDetail = async (req, res) => {
	// PayDetail can be employer, employee or customer
	await PayDetail.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("PayDetail is inserted");
	res.status(201).send({ msg: 'Created PayDetail' });
};

//single pay_detail
const getPayDetailById = async (req, res) => {
	const requestedId = req.params.id;
	const pay_detail = await PayDetail.findOne({ where: { id: requestedId } });
	//implement pay_detail fetch fails
	res.status(200).send(pay_detail);

	/* 
	PayDetail.findAll({})
	.then((pay_details) => {
		res.json(pay_details);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update pay_detail
const updatePayDetail = async (req, res) => {
	const requestedId = req.params.id;
	const pay_detail = await PayDetail.findOne({ where: { id: requestedId } });
	pay_detail.pay_detailname = req.body.pay_detailname;

	//update database
	pay_detail.save();
	//implement pay_detail fetch fails
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
	serverLog.info("PayDetail has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete pay_detail
const deletePayDetail = async (req, res) => {
	const requestedId = req.params.id;
	await PayDetail.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'PayDetail Removed!' });
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
	getPayDetails,
	createPayDetail,
	getPayDetailById,
	updatePayDetail,
	deletePayDetail
}