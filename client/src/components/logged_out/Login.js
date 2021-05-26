// @flow

import React, { useEffect } from "react";

import firebase from "firebase/app";

type LoginProps = {
	login: (string) => Promise<void>,
	removeLoaderKey: (string) => void,
	setSnackbarError: (string) => void,
	history: Object,
	match: Object,
};

function Login({
	login,
	removeLoaderKey,
	match,
	setSnackbarError,
	history,
}: LoginProps) {
	const provider = match.params.provider;

	useEffect(() => {
		firebase
			.auth()
			.getRedirectResult()
			.then(async (result) => {
				// check to see if redirection operation was called
				if (result.user) {
					const idToken = await firebase
						.auth()
						.currentUser.getIdToken(true);
					login(idToken).then((res) => {
						if (res instanceof Error) history.push("/");
					});
				} else {
					if (provider === "google")
						firebase
							.auth()
							.signInWithRedirect(
								new firebase.auth.GoogleAuthProvider()
							);
					else if (provider === "facebook")
						firebase
							.auth()
							.signInWithRedirect(
								new firebase.auth.FacebookAuthProvider()
							);
				}
			})
			.catch(function (error) {
				if (
					error.code ===
					"auth/account-exists-with-different-credential"
				) {
					setSnackbarError(
						"This email address is already in use with another sign-in method."
					);
					history.push("/");
				}
			})
			.finally(() => {
				removeLoaderKey("beginAuth");
			});
	}, [history, login, removeLoaderKey, setSnackbarError, provider]);

	return <React.Fragment />;
}

export default Login;
