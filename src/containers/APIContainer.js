import { connect } from "react-redux";

import API from "../components/api/API";
import { setSnackbar } from "./../actions/snackbar";
import {
	createAccessTokenReq,
	fetchAccessTokenReqState
} from "./../actions/api";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	setSnackbar(message) {
		dispatch(setSnackbar(message));
	},
	createAccessTokenReq(formData) {
		return dispatch(createAccessTokenReq(formData));
	},
	fetchAccessTokenReqState() {
		return dispatch(fetchAccessTokenReqState);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(API);
