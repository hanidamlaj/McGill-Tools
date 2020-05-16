import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCT2qv1HiWP5J9ixp3sDr3mmDumgEL4is4",
	authDomain: "mcgill-tools.firebaseapp.com",
	databaseURL: "https://mcgill-tools.firebaseio.com",
	projectId: "mcgill-tools",
	storageBucket: "mcgill-tools.appspot.com",
	messagingSenderId: "698871000166",
	appId: "1:698871000166:web:8d0b16ed5da49987",
	measurementId: "G-86CPR57GQK",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
