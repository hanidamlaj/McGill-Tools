import { connect } from "react-redux";
import Home from "../components/Home";
import { setLogout } from "../actions/auth";

const mapStateToProps = state => ({
	user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
	logout() {
		dispatch(setLogout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
