import { connect } from "react-redux";

import NavigationMobile from "../components/navigation/navigationMobile";

import { initialUser } from "../reducers/auth";
import { setToken, setUser } from "../actions/auth";

const mapDispatchToProps = dispatch => ({
	logout() {
		dispatch(setToken(null));
		dispatch(setUser(initialUser));
		localStorage.clear();
	}
});

export default connect(
	null,
	mapDispatchToProps
)(NavigationMobile);
