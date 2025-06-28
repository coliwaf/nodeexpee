import { OrderDetail } from "../Models/OrderDetail.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getOrderDetails = async (req, res) => {
	//logged in order_detail if admin see's all order_details if employee see' only their data
	const order_details = await OrderDetail.findAll();
	res.status(200).send(order_details);

	/* 
	OrderDetail.findAll({})
	.then((order_details) => {
		res.json(order_details);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create order_detail(s)
const createOrderDetail = async (req, res) => {
	// OrderDetail can be employer, employee or customer
	await OrderDetail.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("OrderDetail is inserted");
	res.status(201).send({ msg: 'Created OrderDetail' });
};

//single order_detail
const getOrderDetailById = async (req, res) => {
	const requestedId = req.params.id;
	const order_detail = await OrderDetail.findOne({ where: { id: requestedId } });
	//implement order_detail fetch fails
	res.status(200).send(order_detail);

	/* 
	OrderDetail.findAll({})
	.then((order_details) => {
		res.json(order_details);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update order_detail
const updateOrderDetail = async (req, res) => {
	const requestedId = req.params.id;
	const order_detail = await OrderDetail.findOne({ where: { id: requestedId } });
	order_detail.order_detailname = req.body.order_detailname;

	//update database
	order_detail.save();
	//implement order_detail fetch fails
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
	serverLog.info("OrderDetail has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete order_detail
const deleteOrderDetail = async (req, res) => {
	const requestedId = req.params.id;
	await OrderDetail.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'OrderDetail Removed!' });
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
	getOrderDetails,
	createOrderDetail,
	getOrderDetailById,
	updateOrderDetail,
	deleteOrderDetail
}