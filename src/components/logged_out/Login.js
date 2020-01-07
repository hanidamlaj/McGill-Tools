import React, { useEffect } from "react";
import PropTypes from "prop-types";

import * as firebase from "firebase/app";
import "firebase/auth";

function Login({ login, removeLoaderKey, match, setSnackbarError, history }) {
	const provider = match.params.provider;
	const loginWithProvider = provider => {
		if (provider === "google")
			firebase
				.auth()
				.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
		else if (provider === "facebook")
			firebase
				.auth()
				.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
	};

	useEffect(() => {
		firebase
			.auth()
			.getRedirectResult()
			.then(async result => {
				// check to see if redirection operation was called
				if (result.user) {
					const idToken = await firebase.auth().currentUser.getIdToken(true);
					login(idToken).then(res => {
						if (res instanceof Error) history.push("/");
					});
				} else {
					loginWithProvider(provider);
				}
			})
			.catch(function(error) {
				if (error.code === "auth/account-exists-with-different-credential") {
					history.push("/");
					setSnackbarError(
						"This email address is already in use with another sign-in method."
					);
				}
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
