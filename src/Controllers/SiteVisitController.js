import { SiteVisit } from "../Models/SiteVisit.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getSiteVisits = async (req, res) => {
	//logged in site_visit if admin see's all site_visits if employee see' only their data
	const site_visits = await SiteVisit.findAll();
	res.status(200).send(site_visits);

	/* 
	SiteVisit.findAll({})
	.then((site_visits) => {
		res.json(site_visits);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create site_visit(s)
const createSiteVisit = async (req, res) => {
	// SiteVisit can be employer, employee or customer
	await SiteVisit.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("SiteVisit is inserted");
	res.status(201).send({ msg: 'Created SiteVisit' });
};

//single site_visit
const getSiteVisitById = async (req, res) => {
	const requestedId = req.params.id;
	const site_visit = await SiteVisit.findOne({ where: { id: requestedId } });
	//implement site_visit fetch fails
	res.status(200).send(site_visit);

	/* 
	SiteVisit.findAll({})
	.then((site_visits) => {
		res.json(site_visits);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update site_visit
const updateSiteVisit = async (req, res) => {
	const requestedId = req.params.id;
	const site_visit = await SiteVisit.findOne({ where: { id: requestedId } });
	site_visit.site_visitname = req.body.site_visitname;

	//update database
	site_visit.save();
	//implement site_visit fetch fails
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
	serverLog.info("SiteVisit has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete site_visit
const deleteSiteVisit = async (req, res) => {
	const requestedId = req.params.id;
	await SiteVisit.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'SiteVisit Removed!' });
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
	getSiteVisits,
	createSiteVisit,
	getSiteVisitById,
	updateSiteVisit,
	deleteSiteVisit
}