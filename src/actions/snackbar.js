// sets the snackbar message
export const SET_SNACKBAR = "SET_SNACKBAR";
export function setSnackbar(message) {
	return {
		type: SET_SNACKBAR,
		payload: message
	};
}

export const SET_SNACKBAR_ERROR = "SET_SNACKBAR_ERROR";
export function setSnackbarError(message) {
	return {
		type: SET_SNACKBAR_ERROR,
		payload: message
	};
}
