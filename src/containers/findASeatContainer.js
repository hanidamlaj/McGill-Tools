import { connect } from "react-redux";
import FindASeat from "../components/find_a_seat/findASeat";
import { requestCourse } from "../actions/courses";

const mapStateToProps = state => ({
	token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
	requestCourse(courseQuery) {
		dispatch(requestCourse(courseQuery));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FindASeat);
