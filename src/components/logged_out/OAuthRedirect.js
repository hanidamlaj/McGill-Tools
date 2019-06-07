import React, { useEffect } from "react";
import PropTypes from "prop-types";

import * as firebase from "firebase/app";
import "firebase/auth";

function OAuthRedirect({ login, removeLoaderKey, location }) {
	if (location.state && location.state.provider) {
		firebase.auth().signInWithRedirect(location.state.provider);
	}

	useEffect(() => {
		firebase
			.auth()
			.getRedirectResult()
			.then(async result => {
				// check to see if redirection operation was called
				if (result.user) {
					const idToken = await firebase.auth().currentUser.getIdToken(true);
					login(idToken);
					removeLoaderKey("beginAuth");
				}
			})
			.catch(function(error) {
				console.error(error);
				removeLoaderKey("beginAuth");
			});
	}, []);

	return <React.Fragment />;
}

OAuthRedirect.propTypes = {
	location: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	removeLoaderKey: PropTypes.func.isRequired
};

export default OAuthRedirect;
