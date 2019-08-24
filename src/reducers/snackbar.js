import { SET_SNACKBAR } from "../actions/snackbar";

function snackbar(state = "", action) {
	switch (action.type) {
		case SET_SNACKBAR:
			return action.payload;
		default:
			return state;
	}
}

export default snackbar;
