// @flow
import type { State } from "./../reducers/types.js";

import { connect } from "react-redux";

import NavigationDesktop from "../components/navigation/NavigationDesktop";
import { setLogout } from "../actions/auth";

const mapStateToProps = (state: State) => ({
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	logout() {
		dispatch(setLogout());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDesktop);
