import { Order } from "../Models/Order.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getOrders = async (req, res) => {
	//logged in order if admin see's all orders if employee see' only their data
	const orders = await Order.findAll();
	res.status(200).send(orders);

	/* 
	Order.findAll({})
	.then((orders) => {
		res.json(orders);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create order(s)
const createOrder = async (req, res) => {
	// Order can be employer, employee or customer
	await Order.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Order is inserted");
	res.status(201).send({ msg: 'Created Order' });
};

//single order
const getOrderById = async (req, res) => {
	const requestedId = req.params.id;
	const order = await Order.findOne({ where: { id: requestedId } });
	//implement order fetch fails
	res.status(200).send(order);

	/* 
	Order.findAll({})
	.then((orders) => {
		res.json(orders);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update order
const updateOrder = async (req, res) => {
	const requestedId = req.params.id;
	const order = await Order.findOne({ where: { id: requestedId } });
	order.ordername = req.body.ordername;

	//update database
	order.save();
	//implement order fetch fails
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
	serverLog.info("Order has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete order
const deleteOrder = async (req, res) => {
	const requestedId = req.params.id;
	await Order.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Order Removed!' });
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
	getOrders,
	createOrder,
	getOrderById,
	updateOrder,
	deleteOrder
}