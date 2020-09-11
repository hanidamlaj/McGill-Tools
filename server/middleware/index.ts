import express = require("express");
import jwt = require("jsonwebtoken");

import { UserRequest } from "../model/types";

const privKey: string = Buffer.from(
	process.env["priv_key"],
	"base64"
).toString();

/**
 * This middleware function simply logs the request to the console.
 */
export function logRequests(req, res, next) {
	console.info(`${req.method} ${req.originalUrl}`);
	next();
}

/**
 * Middleware function that verifies the validity of the jwt token
 */
export function verifyJwtToken(
	req: UserRequest,
	res: express.Response,
	next: Function
) {
	// Tokens are sent using the 'x-access-token' header in the request.
	// Extract token and verify that it was signed by us.
	const token: string = <string>req.headers["x-access-token"];
	try {
		const decoded = jwt.verify(token, privKey);

		// Attach decoded uid string and isAdmin flag to the request for
		// other middleware functions to access.
		req.uid = decoded.uid;
		req.isAdmin = Boolean(decoded.isAdmin);

		next();
	} catch (err) {
		// Status 401 indicates that the user is unauthorized to access the next
		// middleware function whatever that may be.
		// "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401"
		res.status(401).json({ error: "Invalid jwt token" });
	}
}
