// @flow

import React, { useEffect } from "react";

import {
	getAuth,
	getRedirectResult,
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth";

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
		const auth = getAuth();

		getRedirectResult(auth)
			.then(async (result) => {
				// check to see if redirection operation was called
				if (result?.user) {
					const idToken = await auth.currentUser.getIdToken(true);
					login(idToken).then((res) => {
						if (res instanceof Error) history.push("/");
					});
				} else if (provider === "google") {
					signInWithRedirect(auth, new GoogleAuthProvider());
				} else if (provider === "facebook") {
					const fbAuthProvider = new FacebookAuthProvider();
					fbAuthProvider.addScope("email");
					signInWithRedirect(auth, fbAuthProvider);
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
