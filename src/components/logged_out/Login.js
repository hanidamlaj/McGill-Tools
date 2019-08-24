import React, { useEffect } from "react";
import PropTypes from "prop-types";

import * as firebase from "firebase/app";
import "firebase/auth";

function Login({ login, removeLoaderKey, match }) {
	const provider = match.params.provider;
	useEffect(() => {
		firebase
			.auth()
			.getRedirectResult()
			.then(async result => {
				// check to see if redirection operation was called
				if (result.user) {
					const idToken = await firebase.auth().currentUser.getIdToken(true);
					login(idToken);
				} else {
					if (provider === "google")
						firebase
							.auth()
							.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
					if (provider === "facebook")
						firebase
							.auth()
							.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
				}
			})
			.catch(function(error) {
				console.error(error);
			})
			.finally(() => {
				removeLoaderKey("beginAuth");
			});
	}, []);

	return <React.Fragment />;
}

Login.propTypes = {
	location: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	removeLoaderKey: PropTypes.func.isRequired
};

export default Login;
