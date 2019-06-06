import { addLoaderKey, removeLoaderKey } from "./loaders";

/**
 * represents the type of action
 * @typedef {string} ActionType
 */

/**
 * @type {string} SET_USER async action to set user data
 */
export const SET_USER = "SET_USER";

/**
 * @type {string} SET_TOKEN async action to set jwtToken retrieved from server
 */
export const SET_TOKEN = "SET_TOKEN";

/**
 * @param {string} idToken the idToken provided by firebase
 */
export function login(idToken) {
	return dispatch => {
		dispatch(addLoaderKey("login"));
		fetch("http://localhost:8080/login", {
			body: JSON.stringify({ idToken }),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		})
			.then(res => res.json())
			.then(json => {
				if (!json.error) {
					dispatch({
						type: SET_TOKEN,
						payload: json.token
					});
					dispatch({
						type: SET_USER,
						payload: json.user
					});
					console.log(json);
					return;
				}
				throw json;
			})
			.catch(err => console.error(err.error));
		dispatch(removeLoaderKey("login"));
	};
}

export function getUser() {}

export function getToken() {}
