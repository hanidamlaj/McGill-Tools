// @flow

import type { ThunkAction } from "./types.js";
import Controller from "./Controller.js";

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

	return new Controller("api/request-status", token ?? "")
		.setMethod("GET")
		.send()
		.catch((err: Error) => {
			dispatch(setSnackbarError(err.message || err.toString()));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));
		});
};

export const fetchApiRequests: ThunkAction = (dispatch, getState) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));

	return new Controller("api/getApiRequests", token ?? "")
		.setMethod("GET")
		.send()
		.catch((err: Error) => {
			dispatch(setSnackbarError(err.message || err.toString()));
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

		return new Controller("api/request-access", token ?? "")
			.setMethod("POST")
			.setBody(formData)
			.send()
			.catch((err: Error) => {
				dispatch(setSnackbarError(err.message || err.toString()));
				return err;
			})
			.finally(() => {
				dispatch(removeLoaderKey(CREATE_ACCESS_TOKEN_REQUEST));
			});
	};
}

/**
 * Admin can fetch users' applications for access tokens.
 */
export const fetchAccessTokenApplications: ThunkAction = (
	dispatch,
	getState
) => {
	const token = getState().auth.token;

	dispatch(addLoaderKey("FETCH_ACCESS_TOKEN_APPLICATIONS"));

	return new Controller("/api/getApiRequests", token ?? "")
		.setMethod("GET")
		.send()
		.catch((err: Error) => {
			dispatch(setSnackbarError(err.message || err.toString()));
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey("FETCH_ACCESS_TOKEN_APPLICATIONS"));
		});
};

/**
 * Admin can approve applications for access tokens.
 */
export const approveAccessTokenApplication = (uid: string): ThunkAction => (
	dispatch,
	getState
) => {
	const token = getState().auth.token;
	dispatch(addLoaderKey("APPROVE_ACCESS_TOKEN_APPLICATION"));

	return new Controller(`/api/approveToken/${uid}`, token ?? "")
		.setMethod("POST")
		.send()
		.catch((err: Error) => {
			dispatch(setSnackbarError(err.message || err.toString()));
		})
		.finally(() => {
			dispatch(removeLoaderKey("APPROVE_ACCESS_TOKEN_APPLICATION"));
		});
};
