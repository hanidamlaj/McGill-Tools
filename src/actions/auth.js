import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbar } from "./snackbar";

/**
 * action type and creator for user object retrieved from server
 * @type {string} SET_USER
 */
export const SET_USER = "SET_USER";
export const setUser = user => ({ type: SET_USER, payload: user });

/**
 * action type and creator for jwtToken holding user claims
 * @type {string} SET_TOKEN
 */
export const SET_TOKEN = "SET_TOKEN";
export const setToken = token => ({ type: SET_TOKEN, payload: token });

/**
 * action type and creator for data retrieved from login
 * @type {string} SET_AUTH
 */
export const SET_LOGIN = "SET_LOGIN";
export const setLogin = auth => ({ type: SET_LOGIN, payload: auth });

const REQUEST_LOGIN = "REQUEST_LOGIN";
/**
 * sends ajax request to fetch access token and user data
 * @param {string} idToken the idToken provided by firebase
 */
export function login(idToken) {
	return dispatch => {
		dispatch(addLoaderKey(REQUEST_LOGIN));
		fetch("https://mcgilltools.com/login", {
			body: JSON.stringify({ idToken }),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		})
			.then(res => res.json())
			.then(json => {
				if (json.error) throw new Error(json.message);
				dispatch(setLogin(json));
			})
			.catch(err => {
				dispatch(setSnackbar(err.message));
				return err;
			})
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
	fetch("https://mcgilltools.com/user/profile", {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			dispatch(setUser(json));
		})
		.catch(err => {
			dispatch(setSnackbar(err.message));
		})
		.finally(() => dispatch(removeLoaderKey(REQUEST_USER)));
};

const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const updateUserProfile = user => (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(UPDATE_USER_PROFILE));
	fetch("https://mcgilltools.com/user/profile", {
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token
		},
		method: "POST"
	})
		.then(res => res.json())
		.then(json => {
			if (json.error) throw new Error(json.message);
			dispatch(setUser(json));
		})
		.catch(err => {
			dispatch(setSnackbar(err.message));
		})
		.finally(() => dispatch(removeLoaderKey(UPDATE_USER_PROFILE)));
};
