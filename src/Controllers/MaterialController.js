import { Material } from "../Models/Material.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getMaterials = async (req, res) => {
	//logged in material if admin see's all materials if employee see' only their data
	const materials = await Material.findAll();
	res.status(200).send(materials);

	/* 
	Material.findAll({})
	.then((materials) => {
		res.json(materials);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create material(s)
const createMaterial = async (req, res) => {
	// Material can be employer, employee or customer
	await Material.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Material is inserted");
	res.status(201).send({ msg: 'Created Material' });
};

//single material
const getMaterialById = async (req, res) => {
	const requestedId = req.params.id;
	const material = await Material.findOne({ where: { id: requestedId } });
	//implement material fetch fails
	res.status(200).send(material);

	/* 
	Material.findAll({})
	.then((materials) => {
		res.json(materials);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update material
const updateMaterial = async (req, res) => {
	const requestedId = req.params.id;
	const material = await Material.findOne({ where: { id: requestedId } });
	material.materialname = req.body.materialname;

	//update database
	material.save();
	//implement material fetch fails
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
	serverLog.info("Material has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete material
const deleteMaterial = async (req, res) => {
	const requestedId = req.params.id;
	await Material.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Material Removed!' });
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
	getMaterials,
	createMaterial,
	getMaterialById,
	updateMaterial,
	deleteMaterial
}