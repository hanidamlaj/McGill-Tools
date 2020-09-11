import admin = require("firebase-admin");

// Initialisation of the Firebase SDK.

const serviceAccount = JSON.parse(
	Buffer.from(process.env["firebase_sdk"], "base64").toString()
);

console.log(process.env.NODE_ENV);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		process.env.NODE_ENV === "development"
			? "https://mcgill-tools-dev.firebaseio.com"
			: "https://mcgill-tools.firebaseio.com",
	storageBucket:
		process.env.NODE_ENV === "development"
			? "mcgill-tools-dev.appspot.com"
			: "mcgill-tools.appspot.com",
});

const bucket = admin.storage().bucket();

export default admin;
