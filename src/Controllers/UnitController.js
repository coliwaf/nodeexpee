import { Unit } from "../Models/Unit.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getUnits = async (req, res) => {
	//logged in unit if admin see's all units if employee see' only their data
	const units = await Unit.findAll();
	res.status(200).send(units);

	/* 
	Unit.findAll({})
	.then((units) => {
		res.json(units);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create unit(s)
const createUnit = async (req, res) => {
	// Unit can be employer, employee or customer
	await Unit.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Unit is inserted");
	res.status(201).send({ msg: 'Created Unit' });
};

//single unit
const getUnitById = async (req, res) => {
	const requestedId = req.params.id;
	const unit = await Unit.findOne({ where: { id: requestedId } });
	//implement unit fetch fails
	res.status(200).send(unit);

	/* 
	Unit.findAll({})
	.then((units) => {
		res.json(units);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update unit
const updateUnit = async (req, res) => {
	const requestedId = req.params.id;
	const unit = await Unit.findOne({ where: { id: requestedId } });
	unit.unitname = req.body.unitname;

	//update database
	unit.save();
	//implement unit fetch fails
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
	serverLog.info("Unit has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete unit
const deleteUnit = async (req, res) => {
	const requestedId = req.params.id;
	await Unit.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Unit Removed!' });
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
	getUnits,
	createUnit,
	getUnitById,
	updateUnit,
	deleteUnit
}