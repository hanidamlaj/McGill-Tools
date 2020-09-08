import express = require("express");

import db from "./../model/database";

const router = express.Router();

/**
 * subscribes a user to a given course
 */
router.post(
	"/subscribe/:subject/:course/:year/:semester/:section",
	async (req: any, res: any) => {
		try {
			const updatedCourses = await db.subscribeUserToSection(req.uid, {
				...req.params
			});
			res.json({ subscribedSections: updatedCourses });
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
);

/**
 * unsubscribes a user to a given course
 */
router.post(
	"/unsubscribe/:subject/:course/:year/:semester/:section",
	async (req: any, res: any) => {
		try {
			const updatedCourses = await db.removeNotificationCourse(req.uid, {
				...req.params
			});
			res.json({ subscribedSections: updatedCourses });
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
);

export default router;
