import { connect } from "react-redux";

import Settings from "../components/Settings";
import { setSnackbar } from "./../actions/snackbar";
import { updateUserProfile } from "../actions/auth";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	},
	updateUserProfile(user) {
		dispatch(updateUserProfile(user));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
