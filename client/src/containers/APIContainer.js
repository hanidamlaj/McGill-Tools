// @flow
import type { State } from "./../reducers/types.js";

import { connect } from "react-redux";

import API from "../components/api/API";
import { setSnackbar, setSnackbarError } from "./../actions/snackbar";
import {
	createAccessTokenReq,
	fetchAccessTokenReqState,
	fetchAccessTokenApplications,
} from "./../actions/api";

const mapStateToProps = (state: State) => ({
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	},
	setSnackbarError(message) {
		dispatch(setSnackbarError(message));
	},
	createAccessTokenReq(formData) {
		return dispatch(createAccessTokenReq(formData));
	},
	fetchAccessTokenReqState() {
		return dispatch(fetchAccessTokenReqState);
	},
	fetchAccessTokenApplications() {
		return dispatch(fetchAccessTokenApplications);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(API);
