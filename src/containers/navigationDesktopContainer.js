import { connect } from "react-redux";

import NavigationDesktop from "../components/navigation/navigationDesktop";
import { setToken, setUser } from "../actions/auth";
import { initialUser } from "../reducers/auth";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	logout() {
		dispatch(setToken(null));
		dispatch(setUser(initialUser));
		localStorage.clear();
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavigationDesktop);
