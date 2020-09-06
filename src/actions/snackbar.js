// @flow

import type { SnackbarAction } from "./types.js";

// sets the snackbar message
export const SET_SNACKBAR = "SET_SNACKBAR";
export function setSnackbar(message: string): SnackbarAction {
	return {
		type: SET_SNACKBAR,
		payload: message,
	};
}

export const SET_SNACKBAR_ERROR = "SET_SNACKBAR_ERROR";
export function setSnackbarError(message: string): SnackbarAction {
	return {
		type: SET_SNACKBAR_ERROR,
		payload: message,
	};
}
