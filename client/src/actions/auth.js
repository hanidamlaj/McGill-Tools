// @flow

import type {
	SetUserAction,
	SetTokenAction,
	SetLoginAction,
	SetLogoutAction,
	ThunkAction,
} from "./types.js";
import type { User, AuthReducerState } from "./../reducers/types.js";
import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

import * as firebase from "firebase/app";
import "firebase/auth";

// ––––––––––––––––––––– ACTION CREATORS –––––––––––––––––––––

// Action creator for user profile.
export const setUser = (user: User): SetUserAction => ({
	type: "SET_USER",
	payload: user,
});

// Action creator for jwtToken holding user claims.
export const setToken = (token: string): SetTokenAction => ({
	type: "SET_TOKEN",
	payload: token,
});

// Action creator for data retrieved from login request. (TODO: should be described better)
export const setLogin = (auth: AuthReducerState): SetLoginAction => ({
	type: "SET_LOGIN",
	payload: auth,
});

// Action creator to sign the current user out.
export const setLogout = (): SetLogoutAction => {
	firebase.auth().signOut();
	localStorage.clear();
	return { type: "SET_LOGOUT", payload: null };
};

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

// –––––––––– LOADER KEYS FOR ASYNC ACTIONS ––––––––––

const REQUEST_LOGIN: string = "REQUEST_LOGIN";
const REQUEST_USER: string = "REQUEST_USER";
const UPDATE_USER_PROFILE: string = "UPDATE_USER_PROFILE";

// –––––––––––––––––––––––––––––––––––––––––––––––––––

// ––––––––––––––––––––– ASYNC ACTIONS –––––––––––––––––––––

/**
 * Authenticate user using firebase idToken and retrieve user profile.
 */
export function login(idToken: string): ThunkAction {
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
 * Retrieve the profile of the currently authenticated user.
 */
export const getUser: ThunkAction = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(REQUEST_USER));
	fetch("https://mcgilltools.com/user/profile", {
		headers: {
			"x-access-token": token ?? "",
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
 * Update the profile of the user (e.g. name, subscribedSections, phoneNumber, etc.).
 */
export const updateUserProfile = (user: User): ThunkAction => (
	dispatch,
	getState
) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(UPDATE_USER_PROFILE));
	return fetch("https://mcgilltools.com/user/profile", {
		body: JSON.stringify(user),
		headers: {
			"Content-Type": "application/json",
			"x-access-token": token ?? "",
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
