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
 * action type for data retrieved from login
 * @type {string} SET_AUTH
 */
export const SET_LOGIN = "SET_LOGIN";
export const setLogin = auth => ({ type: SET_LOGIN, payload: auth });

const REQUEST_LOGIN = "REQUEST_LOGIN";
/**
 * Sends ajax request to fetch token and user data.
 * @param {string} idToken the idToken provided by firebase
 */
export function login(idToken) {
	return dispatch => {
		dispatch(addLoaderKey(REQUEST_LOGIN));
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
				dispatch(setLogin(json));
				console.log(json);
			})
			.catch(err => console.error(err.error))
			.finally(() => {
				dispatch(removeLoaderKey(REQUEST_LOGIN));
			});
	};
}

const REQUEST_USER = "REQUEST_USER";
/**
 * async action to retrieve user profile
 * @param {Function} dispatch
 * @param {Function} getState
 */
export const getUser = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_USER));
	fetch("http://localhost:8080/profile", {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json)
		.then(json => {
			if (json.error) throw json;
			dispatch(setUser(json));
		})
		.catch(err => {
			console.error(err);
		});
};
