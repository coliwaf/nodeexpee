import { Contact } from "../Models/Contact.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getContacts = async (req, res) => {
	//logged in contact if admin see's all contacts if employee see' only their data
	const contacts = await Contact.findAll();
	res.status(200).send(contacts);

	/* 
	Contact.findAll({})
	.then((contacts) => {
		res.json(contacts);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create contact(s)
const createContact = async (req, res) => {
	// Contact can be employer, employee or customer

	//count characters then exclude first 0 and spaces.
	
	await Contact.create(req.body)
		.catch((e) => {
			/* this.$swal({
				title: 'Error!',
				text: `${error.response.data.message ?? 'except your message'}`,
			}); */
			res.send({ msg: `${e}` });
		});
	serverLog.info("Contact is inserted");
	res.status(201).send({ msg: 'Created Contact' });
};

//single contact
const getContactById = async (req, res) => {
	const requestedId = req.params.id;
	const contact = await Contact.findOne({ where: { id: requestedId } });
	//implement contact fetch fails
	res.status(200).send(contact);

	/* 
	Contact.findAll({})
	.then((contacts) => {
		res.json(contacts);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update contact
const updateContact = async (req, res) => {
	const requestedId = req.params.id;
	const contact = await Contact.findOne({ where: { id: requestedId } });
	contact.contactname = req.body.contactname;

	//update database
	contact.save();
	//implement contact fetch fails
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
	serverLog.info("Contact has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete contact
const deleteContact = async (req, res) => {
	const requestedId = req.params.id;
	await Contact.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Contact Removed!' });
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
	getContacts,
	createContact,
	getContactById,
	updateContact,
	deleteContact
}