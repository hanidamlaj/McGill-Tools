import { SET_SNACKBAR, SET_SNACKBAR_ERROR } from "../actions/snackbar";

function snackbar(state = { error: "", success: "" }, action) {
	switch (action.type) {
		case SET_SNACKBAR:
			return { error: "", success: action.payload };
		case SET_SNACKBAR_ERROR:
			return { error: action.payload, success: "" };
		default:
			return state;
	}
}

export default snackbar;
