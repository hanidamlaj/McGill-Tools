import { connect } from "react-redux";
import FindASeat from "../../components/find_a_seat/FindASeat";
import { updateUserProfile } from "../../actions/auth";

const mapStateToProps = state => ({ user: state.auth.user });

const mapDispatchToProps = dispatch => ({
	updateUserProfile(user) {
		return dispatch(updateUserProfile(user));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FindASeat);
