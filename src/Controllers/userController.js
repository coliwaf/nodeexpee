import { User } from "../Models/User.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getUsers = async (req, res) => {
	//logged in user if admin see's all users if employee see' only their data
	const users = await User.findAll();
	res.status(200).send(users);

	/* 
	User.findAll({})
	.then((users) => {
		res.json(users);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create user(s)
const createUser = async (req, res) => {
	// User can be employer, employee or customer
	await User.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("User is inserted");
	res.status(201).send({ msg: 'Created User' });
};

//single user
const getUserById = async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: { id: requestedId } });
	//implement user fetch fails
	res.status(200).send(user);

	/* 
	User.findAll({})
	.then((users) => {
		res.json(users);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update user
const updateUser = async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: { id: requestedId } });
	user.username = req.body.username;

	//update database
	user.save();
	//implement user fetch fails
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
	serverLog.info("User has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete user
const deleteUser = async (req, res) => {
	const requestedId = req.params.id;
	await User.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'User Removed!' });
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
	getUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser
}