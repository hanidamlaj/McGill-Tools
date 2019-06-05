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
					console.log(json);
					return;
				}
				throw json;
			})
			.catch(err => console.error(err.error));
	};
}

export function getUser() {}

export function getToken() {}
