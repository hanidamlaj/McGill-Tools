import express = require("express");

import db from "./../model/database";

const router = express.Router();

/**
 * Route that subscribes a user to a given course/section.
 */
router.post(
	"/subscribe/:subject/:course/:year/:semester/:section",
	async (req: any, res: any) => {
		try {
			const updatedCourses = await db.subscribeUserToSection(req.uid, {
				...req.params,
			});
			res.json({ subscribedSections: updatedCourses });
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
);

/**
 * Route that unsubscribes a user from a given course/section.
 */
router.post(
	"/unsubscribe/:subject/:course/:year/:semester/:section",
	async (req: any, res: any) => {
		try {
			const updatedCourses = await db.removeNotificationCourse(req.uid, {
				...req.params,
			});
			res.json({ subscribedSections: updatedCourses });
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
);

export default router;
