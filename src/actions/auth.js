import { addLoaderKey, removeLoaderKey } from "./loaders";

/**
 * action type for user object retrieved from server
 * @type {string} SET_USER
 */
export const SET_USER = "SET_USER";
export const setUser = user => ({ type: SET_USER, payload: user });

/**
 * action type for jwtToken holding user claims
 * @type {string} SET_TOKEN
 */
export const SET_TOKEN = "SET_TOKEN";
export const setToken = token => ({ type: SET_TOKEN, payload: token });

/**
 * set both token and user
 * @type {string} SET_AUTH
 */
export const SET_AUTH = "SET_AUTH";
export const setAuth = auth => ({ type: SET_AUTH, payload: auth });

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
				if (json.error) throw json;
				dispatch(setToken(json.token));
				dispatch(setUser(json.user));
				console.log(json);
			})
			.catch(err => console.error(err.error))
			.finally(() => {
				dispatch(removeLoaderKey("login"));
			});
	};
}

export function getUser() {}

export function getToken() {}
