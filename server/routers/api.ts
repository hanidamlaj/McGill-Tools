import express = require("express");
import uuid = require("uuid");

import { verifyJwtToken } from "./../middleware/index";
import db from "./../model/database";
import { CourseQuery, UserRequest } from "../model/types";

const router = express.Router();

const semesters = ["fall", "winter", "summer"];

/**
 * Returns the live details for a given course. Does *NOT*
 * fetch cached course details.
 */
router.get(
	"/:subject/:course/:year/:semester",
	async (req: UserRequest, res: express.Response) => {
		const accessToken: string = <string>req.query.accessToken;

		// Verify that the access token is valid.
		try {
			await db.verifyAccessToken(accessToken);
		} catch (err) {
			res.status(403).json({ error: err.message || err.toString() });
			return;
		}

		// Access token is verified at this point.
		try {
			// verify valid semester input
			if (!semesters.includes(req.params.semester.toLowerCase()))
				throw new Error("Invalid semester.");

			// Extract course query params from request.
			const { subject, course, year, semester } = req.params;

			const courseDetails = await db.queryCourse(
				{ subject, course, year, semester } as CourseQuery,
				true
			);

			res.json(courseDetails);
		} catch (err) {
			res.json({ error: true, message: err.message || err.toString() });
		}
	}
);

// The following endpoints require user to be authenticated.
router.use(verifyJwtToken);

router.post(
	"/request-access",
	async (req: UserRequest, res: express.Response) => {
		const uid: string = req.uid;
		const json = req.body;

		// The following fields must be present to be declared a valid request.
		const requiredData = ["name", "purpose"];

		try {
			// Extract the 'name' & 'purpose' from the body of the POST request.
			const data = requiredData.reduce(
				(acc, key) => {
					// If the required data is not present or the type
					// is not as expected, throw an error.
					if (!json[key] || typeof json[key] !== "string")
						throw new Error(`Unexpected type for ${key}`);

					acc[key] = json[key];
					return acc;
				},
				{ name: "", purpose: "" }
			);

			const status = await db.createAPITokenRequest(uid, data);

			res.status(200).json(status);
		} catch (err) {
			res
				.status(400)
				.json({ error: true, message: err.message || err.toString() });
		}
	}
);

/**
 * Route that returns the status of the user's request for an API access token.
 */
router.get("/request-status", async (req: any, res: any) => {
	const uid: string = <string>req.uid;

	try {
		const result = await db.getAPITokenRequestStatus(uid);
		res.status(200).json(result);
	} catch (err) {
		res
			.status(400)
			.json({ error: true, message: err.message || err.toString() });
	}
});

/**
 * Route for an admin to approve a user's API access token request.
 */
router.post("/approveToken/:uid", async (req: any, res: any) => {
	const { uid, isAdmin } = req;

	// User must have admin privileges to approve a token.
	if (!isAdmin) {
		res
			.status(403)
			.json({ error: "Forbidden endpoint. User must be an admin." });
		return;
	}

	try {
		// Create an access token by generating a uuid mapping to the user's request.
		await db.approveTokenRequest(uid, uuid());
		res.status(200).end();
	} catch (err) {
		res.json({ error: true, message: err.message || err.toString() });
	}
});

export default router;
