import jwt = require("jsonwebtoken");

const privKey: string = Buffer.from(
	process.env["priv_key"],
	"base64"
).toString();

/**
 * logs request information to console
 */
export function logRequests(req, res, next) {
	console.info(`${req.method} ${req.originalUrl}`);
	next();
}

/**
 * verifies the validity of the jwt token
 * @param req the request
 * @param res the response
 * @param next the next middleware function
 */
export function verifyJwtToken(req: any, res: any, next: Function) {
	// extract token from request
	const token: string = <string>req.headers["x-access-token"];
	try {
		// verify that token was signed by us
		const decoded = jwt.verify(token, privKey);

		// attach properties to req object
		req.uid = decoded.uid;
		req.isAdmin = Boolean(decoded.isAdmin);

		// call next middleware function
		next();
	} catch (err) {
		res.status(401).json({ error: "Invalid jwt token" });
	}
}
