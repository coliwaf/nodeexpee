import { Job } from "../Models/Job.js"
import logger from "node-color-log";
const serverLog = logger.createNamedLogger("Server");

const getJobs = async (req, res) => {
	//logged in job if admin see's all jobs if employee see' only their data
	const jobs = await Job.findAll();
	res.status(200).send(jobs);

	/* 
	Job.findAll({})
	.then((jobs) => {
		res.json(jobs);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//create job(s)
const createJob = async (req, res) => {
	// Job can be employer, employee or customer
	await Job.create(req.body)
		.catch((e) => {
			res.status(201).send({ msg: `${e}` });
		});
	serverLog.info("Job is inserted");
	res.status(201).send({ msg: 'Created Job' });
};

//single job
const getJobById = async (req, res) => {
	const requestedId = req.params.id;
	const job = await Job.findOne({ where: { id: requestedId } });
	//implement job fetch fails
	res.status(200).send(job);

	/* 
	Job.findAll({})
	.then((jobs) => {
		res.json(jobs);
	})
	.catch((error) => {
		console.log(error);
	}); 
	*/
};

//update job
const updateJob = async (req, res) => {
	const requestedId = req.params.id;
	const job = await Job.findOne({ where: { id: requestedId } });
	job.jobname = req.body.jobname;

	//update database
	job.save();
	//implement job fetch fails
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
	serverLog.info("Job has been updated");
	res.status(200).send({ msg: 'Updated!' });

};

//delete job
const deleteJob = async (req, res) => {
	const requestedId = req.params.id;
	await Job.destroy({ where: { id: requestedId } });
	res.status(200).send({ msg: 'Job Removed!' });
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
	getJobs,
	createJob,
	getJobById,
	updateJob,
	deleteJob
}