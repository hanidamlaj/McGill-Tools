/// <reference path="./.env">
/// <reference path="./robots.txt">

// library imports here
import express = require("express");
import cookieParser = require("cookie-parser");
import jwt = require("jsonwebtoken");
import cors = require("cors");
import path = require("path");
require("dotenv").config();

// router imports
import notify from "./routers/notify";
import courses from "./routers/courses";
import user from "./routers/user";
import api from "./routers/api";

// middleware imports
import { verifyJwtToken, logRequests } from "./middleware/";

// model imports
import admin from "./model/firebase";
import db from "./model/database";

const app = express();
const PORT: string = process.env.PORT || "8080";
const privKey: string = Buffer.from(
	process.env["priv_key"],
	"base64"
).toString();

// middleware functions
app.use(cors());
app.use(logRequests);
app.use(cookieParser());
app.use(express.json());

// serve static files
app.use("/static", express.static(path.join(__dirname, "/build/static")));

app.post("/login", async (req, res) => {
	const idToken: string = req.body.idToken;
	try {
		// Verify firebase token.
		const decodedToken = await admin.auth().verifyIdToken(idToken);
		const uid: string = decodedToken.uid;

		// Retrieve user profile associated with token from db.
		const user = await db.login(uid);

		// Sign and return jwt token -- used for authentication.
		res.json({
			token: jwt.sign({ uid, isAdmin: Boolean(user.isAdmin) }, privKey),
			user,
		});
	} catch (err) {
		res
			.status(401)
			.json({ error: true, message: err.message || err.toString() });
	}
});

// Routers -- users must be authenticated before accessing the following routes.
app.use("/notify", verifyJwtToken, notify);
app.use("/courses", verifyJwtToken, courses);
app.use("/user", verifyJwtToken, user);
app.use("/api", api);

// Allow search engines to crawl specific pages.
app.get("/robots.txt", (req, res) => {
	res.type("text/plain");
	res.send(
		"User-agent: *\r\nDisallow: /static\r\nDisallow: /notify\r\nDisallow: /login\r\nDisallow: /courses\r\nDisallow: /user\r\nDisallow: /api"
	);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/build/index.html"));
});

// Handle shutdown gracefully.
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

function shutDown() {
	console.log("server shutdown.");
	server.close();
	process.exit(0);
}

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
