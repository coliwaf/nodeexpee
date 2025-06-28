import { Router } from "express";
const router = Router();

import { getJobs, createJob, getJobById, updateJob, deleteJob } from "../Controllers/JobController.js";

router.route("/jobs")
	.get(getJobs)
	.post(createJob);

router.route("/jobs/:id")
	.get(getJobById)
	.put(updateJob)
	.delete(deleteJob);

export { router };