// @flow
import type { State } from "../../reducers/types.js";

import { connect } from "react-redux";

import AdminAPIView from "../../components/api/AdminAPIView";
import {
	fetchAccessTokenApplications,
	approveAccessTokenApplication,
} from "../../actions/api";

const mapStateToProps = (state: State) => ({
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	fetchAccessTokenApplications() {
		return dispatch(fetchAccessTokenApplications);
	},
	approveAccessTokenApplication(uid: string) {
		return dispatch(approveAccessTokenApplication(uid));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAPIView);
