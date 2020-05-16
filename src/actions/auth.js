import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

import * as firebase from "firebase/app";
import "firebase/auth";

// ––––––––––––––––––––– ACTION CREATORS –––––––––––––––––––––

/**
 * action type and creator for user object retrieved from server
 * @type {string} SET_USER
 */
export const SET_USER = "SET_USER";
export const setUser = (user) => ({ type: SET_USER, payload: user });

/**
 * action type and creator for jwtToken holding user claims
 * @type {string} SET_TOKEN
 */
export const SET_TOKEN = "SET_TOKEN";
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });

/**
 * action type and creator for data retrieved from login request
 * @type {string} SET_AUTH
 */
export const SET_LOGIN = "SET_LOGIN";
export const setLogin = (auth) => ({ type: SET_LOGIN, payload: auth });

/**
 * action type and creator to sign out the current user
 * @type {string} SET_LOGOUT
 */
export const SET_LOGOUT = "SET_LOGOUT";
export const setLogout = () => {
	firebase.auth().signOut();
	localStorage.clear();
	return { type: SET_LOGOUT, payload: null };
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// –––––––––– LOADER KEYS FOR ASYNC ACTIONS ––––––––––

const REQUEST_LOGIN = "REQUEST_LOGIN";
const REQUEST_USER = "REQUEST_USER";
const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

// –––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– ASYNC ACTIONS –––––––––––––––––––––

/**
 * authenticate user using firebase idToken and retrieve user profile
 * @param {string} idToken the idToken provided by firebase
 */
export function login(idToken) {
	return (dispatch) => {
		dispatch(addLoaderKey(REQUEST_LOGIN));
		return fetch("https://mcgilltools.com/login", {
			body: JSON.stringify({ idToken }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.error) throw new Error(json.message);
				dispatch(setLogin(json));
			})
			.catch((err) => {
				dispatch(setSnackbarError(err.message));
				return err;
			})
			.finally(() => {
				dispatch(removeLoaderKey(REQUEST_LOGIN));
			});
	};
}

/**
 * retrieve user profile from server
 * @param {Function} dispatch
 * @param {Function} getState
 */
export const getUser = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_USER));
	fetch("https://mcgilltools.com/user/profile", {
		headers: {
			"x-access-token": token,
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);
			dispatch(setUser(json));
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
		})
		.finally(() => dispatch(removeLoaderKey(REQUEST_USER)));
};

/**
 * update the profile of the user (e.g. Name, subscribedSections, phoneNumber, etc.)
 * @param {object} user profile of the user
 */
export const updateUserProfile = (user) => (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(UPDATE_USER_PROFILE));
	return fetch("https://mcgilltools.com/user/profile", {
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token,
		},
		method: "POST",
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) throw new Error(json.message);

			// log request
			firebase.analytics().logEvent("update_profile");

			dispatch(setUser(json));
			return json;
		})
		.catch((err) => {
			dispatch(setSnackbarError(err.message));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(UPDATE_USER_PROFILE));
		});
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
