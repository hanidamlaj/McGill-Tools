// @flow

import type { ThunkAction } from "./types.js";
import { BASE_URL } from "./types.js";

import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

const FETCH_ACCESS_TOKEN_REQUEST: string = "FETCH_ACCESS_TOKEN_REQUEST";
const CREATE_ACCESS_TOKEN_REQUEST: string = "CREATE_ACCESS_TOKEN_REQUEST";

/**
 * retrieve the state of the application for api access token
 */
export const fetchAccessTokenReqState: ThunkAction = (dispatch, getState) => {
	// request parameters
	const token = getState().auth.token;
	dispatch(addLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));

	return fetch(`${BASE_URL}api/request-status`, {
		headers: {
			"x-access-token": token ?? "",
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) throw new Error(res.error);
			return res;
		})
		.catch((err) => {
			setSnackbarError(err.message || err.toString());
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));
		});
};

/**
 * Create application for api access token.
 * TODO: type annotation for formData
 */
export function createAccessTokenReq(formData: any): ThunkAction {
	return function (dispatch, getState) {
		// request parameters
		const token = getState().auth.token;

		dispatch(addLoaderKey(CREATE_ACCESS_TOKEN_REQUEST));
		return fetch(`${BASE_URL}api/request-access`, {
			body: JSON.stringify(formData),
			headers: {
				"x-access-token": token ?? "",
				"Content-Type": "application/json",
			},
			method: "POST",
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) throw new Error(res.error);
				return res;
			})
			.catch((err) => {
				setSnackbarError(err.message || err.toString());
				return err;
			})
			.finally(() => {
				dispatch(removeLoaderKey(CREATE_ACCESS_TOKEN_REQUEST));
			});
	};
}
