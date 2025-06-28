import { Router } from "express";
const router = Router();

import { getSiteVisits, createSiteVisit, getSiteVisitById, updateSiteVisit, deleteSiteVisit } from "../Controllers/SiteVisitController.js";

router.route("/site_visits")
	.get(getSiteVisits)
	.post(createSiteVisit);

router.route("/site_visits/:id")
	.get(getSiteVisitById)
	.put(updateSiteVisit)
	.delete(deleteSiteVisit);

export { router };