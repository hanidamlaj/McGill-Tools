import express = require("express");

import db from "./../model/database";
import { UserInfo } from "./../model/types";

const router = express.Router();

/**
 * Return user profile.
 */
router.get("/profile", async (req: any, res: any) => {
	try {
		const user = await db.getUser(req.uid);
		res.json(user);
	} catch (err) {
		res.json({ error: true, message: err.message || err.toString() });
	}
});

// Return the user's subscribed sections.
router.get("/profile/subscribedSections", async (req: any, res: any) => {
	try {
		const user = await db.getUser(req.uid);
		res.json(user.subscribedSections ?? []);
	} catch (err) {
		res.json({ error: true, message: err.message || err.toString() });
	}
});

/**
 * Update user's profile.
 */
router.post("/profile", async (req: any, res: any) => {
	try {
		const json = req.body;

		// List of valid keys to update user data.
		const validKeys: string[] = [
			"displayName",
			"email",
			"phoneNumber",
			"photoURL",
		];

		const userData: UserInfo = validKeys.reduce(
			(acc, key) => {
				// If the data is not present or the type is not as expected, throw an error.
				if (!json[key] || typeof json[key] !== "string")
					throw Error(`Unexpected type for ${key}`);

				acc[key] = json[key];
				return acc;
			},
			{
				uid: req.uid,
				displayName: "",
				email: "",
				phoneNumber: "",
				photoURL: "",
			}
		);

		const updatedUser = await db.updateUser(req.uid, userData);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.json({ error: true, message: err.message || err.toString() });
	}
});

export default router;
