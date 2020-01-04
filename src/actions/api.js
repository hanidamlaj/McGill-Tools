import { addLoaderKey, removeLoaderKey } from "./loaders";
import { setSnackbarError } from "./snackbar";

const FETCH_ACCESS_TOKEN_REQUEST = "FETCH_ACCESS_TOKEN_REQUEST";
const CREATE_ACCESS_TOKEN_REQUEST = "CREATE_ACCESS_TOKEN_REQUEST";

/**
 * retrieve the state of the application for api access token
 * @param {Function} dispatch
 * @param {Function} getState
 */
export function fetchAccessTokenReqState(dispatch, getState) {
	// request parameters
	const token = getState().auth.token;
	dispatch(addLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));

	return fetch("https://mcgilltools.com/api/request-status", {
		headers: {
			"x-access-token": token
		}
	})
		.then(res => res.json())
		.then(res => {
			if (res.error) throw new Error(res.error);
			return res;
		})
		.catch(err => {
			setSnackbarError(err.message || err.toString());
			return err;
		})
		.finally(() => {
			dispatch(removeLoaderKey(FETCH_ACCESS_TOKEN_REQUEST));
		});
}

/**
 * create application for api access token
 * @param {Function} dispatch
 * @param {Function} getState
 */
export function createAccessTokenReq(formData) {
	return function(dispatch, getState) {
		// request parameters
		const token = getState().auth.token;

		dispatch(addLoaderKey(CREATE_ACCESS_TOKEN_REQUEST));
		return fetch("https://mcgilltools.com/api/request-status", {
			body: JSON.stringify(formData),
			headers: {
				"x-access-token": token,
				"Content-Type": "application/json"
			},
			method: "POST"
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) throw new Error(res.error);
				return res;
			})
			.catch(err => {
				setSnackbarError(err.message || err.toString());
				return err;
			})
			.finally(() => {
				dispatch(removeLoaderKey(CREATE_ACCESS_TOKEN_REQUEST));
			});
	};
}
