import admin = require("firebase-admin");

const serviceAccount = JSON.parse(
	Buffer.from(process.env["firebase_sdk"], "base64").toString()
);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://mcgill-tools.firebaseio.com",
	storageBucket: "mcgill-tools.appspot.com",
});

const bucket = admin.storage().bucket();

export default admin;
