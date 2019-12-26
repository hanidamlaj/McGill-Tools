import { connect } from "react-redux";

import API from "../components/API";
import { setSnackbar, setSnackbarError } from "./../actions/snackbar";
import { updateUserProfile, getUser } from "../actions/auth";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	},
	setSnackbarError(message) {
		dispatch(setSnackbarError(message));
	},
	updateUserProfile(user) {
		return dispatch(updateUserProfile(user));
	},
	getUser() {
		dispatch(getUser);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(API);
