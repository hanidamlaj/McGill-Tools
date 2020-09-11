import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/analytics";

// Use different firebase config parameters if we're in a dev environment.
const firebaseConfig =
	process.env.NODE_ENV === "development"
		? {
				apiKey: "AIzaSyDHRDx5DpKwVdAj9qAX18DGt_4k8yYyiII",
				authDomain: "mcgill-tools-dev.firebaseapp.com",
				databaseURL: "https://mcgill-tools-dev.firebaseio.com",
				projectId: "mcgill-tools-dev",
				storageBucket: "mcgill-tools-dev.appspot.com",
				messagingSenderId: "587608006105",
				appId: "1:587608006105:web:ed5c6a6bd2139c7f168dc8",
				measurementId: "G-ZYWCMQXP2D",
		  }
		: {
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
