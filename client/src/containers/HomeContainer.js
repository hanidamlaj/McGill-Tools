// @flow
import type { State } from "./../reducers/types.js";

import { connect } from "react-redux";
import Home from "../components/Home";
import { setLogout } from "../actions/auth";

const mapStateToProps = (state: State) => ({
	user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
	logout() {
		dispatch(setLogout());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
