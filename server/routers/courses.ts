import express = require("express");

import db from "./../model/database";
import { CourseQuery, Course } from "../model/types";

const router = express.Router();

/**
 * Returns a maximum of five autocompleted courses codes based on user input.
 */
router.get("/autocomplete/:str", async (req, res) => {
	const str: string = req.params.str;
	if (str.length <= 4) res.json([]);
	else {
		try {
			const suggestions = await db.autocomplete(str.toUpperCase());
			res.json(suggestions);
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
});

const semesters = ["fall", "winter", "summer"];

/**
 * Returns the details for a given course.
 */
router.get("/:subject/:course/:year/:semester", async (req, res) => {
	try {
		// Verify valid semester input.
		if (!semesters.includes(req.params.semester.toLowerCase()))
			throw new Error("Invalid semester.");

		const { subject, course, year, semester } = req.params;

		const courseDetails = await db.queryCourse(
			{ subject, course, year, semester },
			req.query.forceRefresh !== undefined
		);

		res.json(courseDetails);
	} catch (err) {
		res.json({ error: true, message: err.message || err.toString() });
	}
});

export default router;
