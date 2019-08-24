// sets the snackbar message
export const SET_SNACKBAR = "SET_SNACKBAR";
export function setSnackbar(message) {
	return {
		type: SET_SNACKBAR,
		payload: message
	};
}
